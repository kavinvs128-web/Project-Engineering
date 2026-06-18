import { PrismaClient } from '@prisma/client';
import { getProducts, getProductById } from './product.service.js';

const prisma = new PrismaClient();

export async function listProducts(req, res) {
  try {
    let {
      page = 1,
      limit = 10,
      sortBy = "id",
      order = "asc",
      fields
    } = req.query;

    // 🔹 Convert to numbers
    page = parseInt(page);
    limit = parseInt(limit);

    // 🔴 VALIDATION
    if (isNaN(page) || page < 1) {
      return res.status(400).json({ error: "Invalid page number" });
    }

    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({ error: "Invalid limit" });
    }

    const MAX_LIMIT = 100;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    const skip = (page - 1) * limit;

    // 🔴 FIELD SELECTION
    const allowedFields = ["id", "name", "price", "description", "createdAt"];

    let select = undefined;

    if (fields) {
      const requestedFields = fields.split(",");

      const invalidFields = requestedFields.filter(
        (f) => !allowedFields.includes(f)
      );

      if (invalidFields.length > 0) {
        return res.status(400).json({
          error: `Invalid fields: ${invalidFields.join(",")}`
        });
      }

      select = {};
      requestedFields.forEach((f) => {
        select[f] = true;
      });
    }

    // 🔴 SORT VALIDATION
    const allowedSortFields = ["id", "name", "price", "createdAt"];

    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({ error: "Invalid sortBy field" });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).json({ error: "Invalid order value" });
    }

    // 🔥 MAIN QUERY
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order
      },
      select
    });

    const total = await prisma.product.count();

    res.json({
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: products
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// ✅ ADD THIS (missing function)
export async function getProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}