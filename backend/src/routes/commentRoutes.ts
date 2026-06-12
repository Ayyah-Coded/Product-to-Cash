import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";

const router = Router();

router.param("commentId, productId", (req, res, next, id) => {
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid commentId" });
  }
  next();
});

// POST /api/comments/:productId - Add comment to product (protected)
router.post("/:productId", requireAuth(), commentController.createComment);

// DELETE /api/comments/:commentId - Delete comment (protected - owner only)
router.delete("/:commentId", requireAuth(), commentController.deleteComment);

export default router;