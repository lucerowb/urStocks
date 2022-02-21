const express = require("express");
const companyRouter = express.Router();
const {
  getCompanies,
  setCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("./company.controllers");
const { protect } = require("../../middleware/authMiddleware");

companyRouter.route(`/`).get(getCompanies).post(setCompany);
companyRouter
  .route(`/:id`)
  .get(getCompanyById)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = companyRouter;
