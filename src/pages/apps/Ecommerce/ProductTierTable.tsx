import React from "react";
import { Form } from "react-bootstrap";
import { Tier } from "./hooks/types";

interface ProductTierTableProps {
    productDetails: {
        tiers: Tier[];
    };
    handleTierChange: any,
    addTierItem: (index: number, value: string) => void;
    t?: (key: string) => string;
}

export const ProductTierTable: React.FC<ProductTierTableProps> = ({
    productDetails,
    handleTierChange,
    addTierItem,
    t = (key) => key,
}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Tier Type</th>
                    <th>Actual Price</th>
                    <th>Discount (%)</th>
                    <th>Price with Discount</th>
                    <th>Items Included</th>
                </tr>
            </thead>
            <tbody>
                {productDetails.tiers.map((tier, index) => (
                    <tr key={index}>
                        <td>
                            {tier.tierType !== "Custom" ? (
                                <Form.Select
                                    value={tier.tierType}
                                    onChange={(e) =>
                                        handleTierChange(index, "tierType", e.target.value)
                                    }
                                >
                                    <option value="Budget">Budget</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    type="text"
                                    value={tier.tierType}
                                    onChange={(e) =>
                                        handleTierChange(index, "tierType", e.target.value)
                                    }
                                />
                            )}
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                value={tier.actualPrice}
                                onChange={(e) =>
                                    handleTierChange(
                                        index,
                                        "actualPrice",
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                value={tier.discountPer}
                                onChange={(e) =>
                                    handleTierChange(
                                        index,
                                        "discountPer",
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                value={tier.priceWithDiscount.toFixed(2)}
                                readOnly
                            />
                        </td>
                        <td>
                            <div className="d-flex flex-wrap align-items-center">
                                {tier.itemsIncluded.map((item, idx) => (
                                    <span key={idx} className="badge bg-primary me-1 mb-1">
                                        {item}
                                    </span>
                                ))}
                                <Form.Control
                                    type="text"
                                    placeholder={t("Add Item")}
                                    className="me-2 mt-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addTierItem(index, e.currentTarget.value);
                                            e.currentTarget.value = "";
                                        }
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTierTable;
