import React from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { IPoojariRitual, IRitual } from './types';

interface PoojariRitualTableProps {
    rituals: IRitual[];
    onChange: (index: number, field: keyof IRitual, value: any) => void;
    onAdd: () => void;
}

const PoojariRitualTable: React.FC<PoojariRitualTableProps> = ({ rituals, onChange, onAdd }) => {
    return (
        <div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Ritual Name</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rituals && rituals.length > 0 ? (
                        rituals.map((ritual, idx) => (
                            <tr key={idx}>
                                <td>
                                    <Form.Control
                                        type="text"
                                        value={ritual.name || ''}
                                        onChange={e => onChange(idx, 'name', e.target.value)}
                                        placeholder="Ritual Name"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={ritual.defaultPrice || ''}
                                        onChange={e => onChange(idx, 'defaultPrice', Number(e.target.value))}
                                        placeholder="Price"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        value={ritual.description || ''}
                                        onChange={e => onChange(idx, 'description', e.target.value)}
                                        placeholder="Description"
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">
                                No rituals added.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button variant="outline-primary" onClick={onAdd}>
                Add Ritual
            </Button>
        </div>
    );
};

export default PoojariRitualTable;