import React, { useState } from "react";

const Rule = ({ rule, index, handleRuleChange, handleRemoveRule, rules }) => {
    const [text, setText] = useState(rule || "");

    const handleChange = (e, setFunction) => {
        setFunction(e.target.value);
        handleRuleChange(index, text);
    };

    return (
        <div className="rule_container">
            <div className="rule_div">
                <input
                    type="text"
                    name="rule"
                    className="form-control rule"
                    placeholder="Rule"
                    value={text}
                    onChange={(e) => handleChange(e, setText)}
                />
            </div>
            <div className="close_modal btn btn-danger" onClick={() => handleRemoveRule(index)}>
                x
            </div>
           
        </div>
    );
};

export default Rule;