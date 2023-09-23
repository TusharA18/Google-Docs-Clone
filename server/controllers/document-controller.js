import { isValidObjectId } from "mongoose";
import Document from "../models/Document.js";
import { isObjectIdOrHexString } from "mongoose";

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

export const getAllDocuments = async (req, res) => {
   try {
      const documents = await Document.find({ userId: req.body.userId });

      if (!documents) {
         return res.status(400).json({ msg: "No documents found!" });
      }

      return res
         .status(200)
         .json({ msg: "Documents fetched successfully", documents });
   } catch (error) {
      res.status(400).json({
         msg: "Internal serve error",
         error: error.message,
      });
   }
};

export const fetchDocument = async (req, res) => {
   try {
      const { docId } = req.body;

      if (!isValidObjectId(docId)) {
         return res
            .status(400)
            .json({ msg: "Please enter a valid documentID!" });
      }

      const document = await Document.findById(docId).catch((err) =>
         res.status(400).json({ msg: "Please enter a valid documentID!" })
      );

      if (!document) {
         return res.status(400).json({ msg: "No document found!" });
      }

      return res
         .status(200)
         .json({ msg: "Document fetched successfully", document });
   } catch (error) {
      res.status(400).json({
         msg: "Internal serve error",
         error: error.message,
      });
   }
};

export const updateDocument = async (req, res) => {
   try {
      const { doc } = req.body;

      const document = await Document.findByIdAndUpdate(doc._id, doc);

      return res
         .status(200)
         .json({ msg: "Document updated successfully", document });
   } catch (error) {
      res.status(400).json({
         msg: "Internal serve error",
         error: error.message,
      });
   }
};

export const deleteDocument = async (req, res) => {
   try {
      await Document.findByIdAndDelete(req.body.docId);

      return res.status(200).json({ msg: "Document deleted successfully" });
   } catch (error) {
      res.status(400).json({
         msg: "Internal serve error",
         error: error.message,
      });
   }
};
