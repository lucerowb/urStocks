const asyncHandler = require("express-async-handler");
const Company = require(`./company.model`);
// const User = require(`../users/user.model`);

/**
 * @desc Get all companies
 * @route GET /api/companies
 * @access Public
 */
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();
  res.status(200).json({ code: 0, message: "success", data: companies });
});

/**
 * @desc Set company
 * @route POST /api/companies
 * @access Public
 */
const setCompany = asyncHandler(async (req, res) => {
  const { company_name, symbol } = req.body;

  //check if company exists
  const companyExist = await Company.findOne({ company_name, symbol });
  if (companyExist) {
    res.status(400);
    throw new Error("Company already exists");
  }
  const company = await Company.create({
    // user: req.user.id,
    company_name: req.body.company_name,
    symbol: req.body.symbol,
    available_quantity: req.body.available_quantity,
    prev_amount: req.body.prev_amount,
    current_amount: req.body.current_amount,
  });
  res.status(200).json({ code: 0, message: "success", data: company });
});

/**
 * @desc Get company
 * @route GET /api/companies/:id
 * @access Public
 */
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(400);
    throw new Error("Company not found");
  }

  res.status(200).json({ code: 0, message: "success", data: company });
});

/**
 * @desc Update company
 * @route PUT /api/companies/:id
 * @access Public
 */
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(400);
    throw new Error("Company not found");
  }

  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ code: 0, message: "success", data: updatedCompany });
});

/**
 * @desc Delete company
 * @route DELETE /api/companies/:id
 * @access Public
 */
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(400);
    throw new Error("Company not found");
  }
  await company.remove();
  res
    .status(200)
    .json({ code: 0, message: "success", data: { _id: req.params.id } });
});

module.exports = {
  getCompanies,
  setCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
