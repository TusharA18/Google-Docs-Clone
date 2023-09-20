import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
   try {
      const newDocument = await Document.create(req.body.document);

      return res.status(200).json({ msg: "New document created", newDocument });
   } catch (error) {
      res.status(400).json({
         msg: "Document not created",
         error: error.message,
      });
   }
};
