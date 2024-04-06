import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { validationAddProductData, validationUpdateProductQuantity } from "../utils/validatation";

export const addGrocery = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const valid = validationAddProductData(body);

        if (valid.error) {
            return res.status(400).json({
                data: {},
                error: true,
                message: valid.error.message
            });
        }

        const response = await productService.add(body);
        return res.status(201).json({
            data: response,
            error: false,
            message: "product successfully inserted"
        });
    } catch (error) {
        let message = "Something went wrong";
        if (error instanceof Error)
            message = error.message;

        return res.status(500).json({
            data: {},
            error: true,
            message
        });
    }
}

export const getAllGroceryItems = async (req: Request, res: Response) => {
    try {
        const response = await productService.getAllItems();
        return res.status(200).json({
            data: response,
            error: false,
            message: "All glocery items get successfully"
        });

    } catch(error) {
        let message = "Something went wrong";
        if (error instanceof Error)
            message = error.message;

        return res.status(500).json({
            data: {},
            error: true,
            message
        });
    }
}

export const getAvailableItems = async (req: Request, res: Response) => {
    try{
        const response = await productService.getAvailableItem();
        return res.status(200).json({
            data: response,
            error: false,
            message: "All glocery items get successfully"
        });
    } catch(error) {
        let message = "Something went wrong";
        if (error instanceof Error)
            message = error.message;

        return res.status(500).json({
            data: {},
            error: true,
            message
        });        
    }
}

export const removeItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedItem = await productService.removeItem(id);
        if (!deletedItem) {
            return res.status(400).json({
                data: {},
                error: true,
                message: "Invalid Glocery Id"
            });
        }
        return res.status(200).json({
            data: {},
            error: true,
            message: "Item successfully deleted"
        });

    } catch(error) {
        let message = "Something went wrong";
        if (error instanceof Error)
            message = error.message;

        return res.status(500).json({
            data: {},
            error: true,
            message
        });
    }

}

export const updateItem = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const {id} = req.params;
        const valid = validationAddProductData(body);

        if (valid.error) {
            return res.status(400).json({
                data: {},
                error: true,
                message: valid.error.message
            });
        }
        
        const updatedProduct = productService.updateItem(id, body);
        if (!updatedProduct) {
            return res.status(400).json({
                data: {},
                error: true,
                message: "Invalid glocery item id"
            });
        }

        return res.status(200).json({
            data: updatedProduct,
            error: false,
            message: "Glocery item successfully updated"
        });
    } catch (error) {
        let message = "Something went wrong";
        if (error instanceof Error)
            message = error.message;

        return res.status(500).json({
            data: {},
            error: true,
            message
        });        
    }
}

export const manageItemQuantity = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const {id} = req.params;
        const valid = validationUpdateProductQuantity(body);

        if (valid.error) {
            return res.status(400).json({
                data: {},
                error: true,
                message: valid.error.message
            });
        }
        
        const updatedProduct = productService.updateItemQuantity(id, body.quantityAvailable);
        if (!updatedProduct) {
            return res.status(400).json({
                data: {},
                error: true,
                message: "Invalid glocery item id"
            });
        }

        return res.status(200).json({
            data: updatedProduct,
            error: false,
            message: "Glocery item quantity successfully updated"
        });
    } catch (error) {
        let message = "Something went wrong";
        if (error instanceof Error)
            message = error.message;

        return res.status(500).json({
            data: {},
            error: true,
            message
        });        
    }
}

