import React, { useState } from "react";

const Coordinator = ({ coordinator, index, handleCoordinatorChange, handleRemoveCoordinator }) => {
    const [name, setName] = useState(coordinator.coordinator_name || "");
    const [number, setNumber] = useState(coordinator.coordinator_number || "");

    const handleChange = (e, setFunction) => {
        setFunction(e.target.value);
        handleCoordinatorChange(index, {
            coordinator_name: name,
            coordinator_number: number,
        });
    };

    return (
        <div className="hold_coordinators">
            <div className="form-group coordinator_div">
                <input
                    type="text"
                    name="coordinator_name"
                    className="form-control coordinator_name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => handleChange(e, setName)}
                />
            </div>
            <div className="form-group coordinator_div">
                <input
                    type="text"
                    name="coordinator_number"
                    className="form-control coordinator_number"
                    placeholder="phone number"
                    value={number}
                    onChange={(e) => handleChange(e, setNumber)}
                />
            </div>
            <div className="close_modal btn btn-danger" onClick={() => handleRemoveCoordinator(index)}>
                x
            </div>
            
        </div>
    );
};

export default Coordinator;