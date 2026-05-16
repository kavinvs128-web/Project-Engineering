import 'dotenv/config'
import { callLLM } from './backend/services/llmService.js'
import * as Originals from './prompts/originals.js'
import * as Rewritten from './prompts/rewritten.js'

// Test Inputs
const INPUTS = {
  a: "Mitosis is when cells divide. There are 4 phases. Prophase is when chromosomes condense. Metaphase the chromosomes line up. Anaphase they split. Telophase new cells form. DNA replicates before division starts. This is important for growth and repair.",
  b: "I interviewed at Google for a SWE intern role in March. The interview had 3 rounds. First was a screening call, then two technical rounds. They asked me about arrays and dynamic programming. I solved the first problem easily but struggled with the DP one. I was given an offer but turned it down due to relocation. The interviewers were nice and gave good feedback about my problem-solving approach.",
  c: "TypeError: Cannot read properties of undefined (reading 'map')\n    at UserList.render (/app/components/UserList.jsx:34:22)\n    at processChild (/app/node_modules/react-dom/cjs/react-dom-server.node.development.js:3990:14)\n    at resolve (/app/node_modules/react-dom/cjs/react-dom-server.node.development.js:4054:5)\n    at ReactDOMServerRenderer.read (/app/node_modules/react-dom/cjs/react-dom-server.node.development.js:4402:29)"
}

// Parse args
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.replace('--', '').split('=')
  acc[key] = value
  return acc
}, {})

const task = args.task?.toLowerCase()
const version = args.version?.toLowerCase() || 'bad'
const temperature = args.temperature || 0.7

if (!['a', 'b', 'c'].includes(task)) {
  console.error('Error: --task must be a, b, or c')
  process.exit(1)
}

if (!['bad', 'good'].includes(version)) {
  console.error('Error: --version must be bad or good')
  process.exit(1)
}

async function run() {
  const promptModule = version === 'bad' ? Originals : Rewritten
  const promptFnName = `TASK_${task.toUpperCase()}_PROMPT`
  const promptFn = promptModule[promptFnName]

  if (!promptFn) {
    console.error(`Error: ${promptFnName} not found in prompts/${version === 'bad' ? 'originals.js' : 'rewritten.js'}`)
    process.exit(1)
  }

  const input = INPUTS[task]
  const { systemMsg, userMsg } = promptFn(input)

  console.log('--------------------------------------------------')
  console.log(`TASK: ${task.toUpperCase()}`)
  console.log(`VERSION: ${version.toUpperCase()}`)
  console.log(`MODEL: ${process.env.LLM_MODEL || 'gpt-3.5-turbo'}`)
  console.log(`TEMPERATURE: ${temperature}`)
  console.log('--------------------------------------------------')
  console.log('SYSTEM MESSAGE:', systemMsg || '(empty)')
  console.log('USER MESSAGE:', userMsg)
  console.log('--------------------------------------------------')
  console.log('Calling LLM API...')

  const start = Date.now()
  try {
    const response = await callLLM(systemMsg, userMsg, temperature)
    const end = Date.now()
    const duration = ((end - start) / 1000).toFixed(2)

    console.log('\n--- RAW RESPONSE ---')
    console.log(response)
    console.log('--------------------')
    console.log(`\nResponse received in ${duration}s`)
  } catch (error) {
    console.error(`\nError: ${error.message}`)
  }
}

run()
