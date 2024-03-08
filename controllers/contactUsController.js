const ContactUsModel = require('../models/contactUsModel');

exports.createContactUsEntry = async (req, res) => {
    try {
        // const { name, phoneNo, company, email, message } = req.body;

        // Create a new contact us entry
        const newContactUsEntry = new ContactUsModel(req.body);
        await newContactUsEntry.save();

        res.status(201).json({ message: 'Contact us entry created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllContactUsEntries = async (req, res) => {
    try {
        const contactUsEntries = await ContactUsModel.find();

        res.status(200).json(contactUsEntries);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleContactUsEntry = async (req, res) => {
    try {
        const contactUsEntryId = req.params.id;
        const contactUsEntry = await ContactUsModel.findById(contactUsEntryId);

        if (!contactUsEntry) {
            return res.status(404).json({ message: 'Contact us entry not found' });
        }

        res.status(200).json(contactUsEntry);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleContactUsEntry = async (req, res) => {
    try {
        const contactUsEntryId = req.params.id;

        const deletedContactUsEntry = await ContactUsModel.findByIdAndDelete(contactUsEntryId);

        if (!deletedContactUsEntry) {
            return res.status(404).json({ message: 'Contact us entry not found' });
        }

        res.status(200).json({ message: 'Contact us entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
