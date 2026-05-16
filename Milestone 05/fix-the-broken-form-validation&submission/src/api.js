// Simulated API — do not modify this file
export const submitBugReport = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server rejecting duplicate titles
      if (data.title && data.title.toLowerCase().includes('login')) {
        reject({
          status: 409,
          message: 'A bug report with a similar title already exists. Please be more specific.',
          field: 'title',
        })
        return
      }
      resolve({ id: `BUG-${Math.floor(Math.random() * 9000) + 1000}`, ...data })
    }, 1800)
  })
}
