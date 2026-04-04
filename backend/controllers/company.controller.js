import { Company } from '../models/company.model.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: 'Company name is required', success: false });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: 'Company already registered on this name.' });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res
      .status(201)
      .json({ message: 'Company registered successfully.', success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal server error ', success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user
    const companies = await Company.find({ userId });

    if (!companies) {
      return res
        .status(404)
        .json({ message: 'Companies not found.', success: false });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
  }
};

// *? get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.find(CompanyId);

    if (!company) {
      return res
        .status(404)
        .json({ message: 'Company not found', success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
  }
};

// *? Updating the companies data
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const title = req.file;
    //cloudinary will come here

    const updatedData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { return: true }
    );

    if (!company) {
      return res
        .status(404)
        .json({ message: 'Company not found', success: false });
    }

    return res.status(200).json({
      message: 'Company information updated successfuly',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
