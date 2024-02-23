import React, { useState, useEffect } from "react";
import Coordinator from "./Cordinator";
import Rule from "./Rule";

const Events = ({ }) => {
    const [isEdit, setIsEdit] = useState(true);
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [categories, setCategories] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("select");
    const [selectedEvent, setSelectedEvent] = useState("select");
    const [formData, setFormData] = useState({
        category: "",
        eventName: "",
        flagship: false,
        startTime: null,
        endTime: null,
        venue: "",
        description: "",
        rules: [],
        coordinators: [],
        poster: "",
        document: "",
    });

    useEffect(() => {
        fetchCategories();
        setSelectedCategory("select");
    }, []);

    const resetForm = () => {
        setFormData({
            category: "",
            eventName: "",
            flagship: false,
            startTime: null,
            endTime: null,
            venue: "",
            description: "",
            rules: [],
            coordinators: [],
            poster: "",
            document: "",
        });
        setImage(null);
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
    };

    useEffect(() => {
        resetForm()
    }, [isEdit]);

    const handleAddCoordinator = () => {
        setFormData({
            ...formData,
            coordinators: [
                ...formData.coordinators,
                {
                    coordinator_name: "",
                    coordinator_number: "",
                },
            ],
        });
    };

    const handleAddRule = () => {
        setFormData({
            ...formData,
            rules: [...formData.rules, ""],
        });
    }

    const fetchCategories = async () => {
        const response = await fetch("https://us-central1-techspardha-87928.cloudfunctions.net/api2/events/categories");
        const data = await response.json();
        console.log(data);
        setCategories(data.data.categories);
        setSelectedEvent("select");
    };

    const fetchEvents = async (selectedCategory) => {
        if (selectedCategory === "select") {
            // setEvents([]);
            setSelectedEvent("select");
            return;
        }

        const response = await fetch("https://us-central1-techspardha-87928.cloudfunctions.net/api2/events?eventCategory=" + selectedCategory);
        const data = await response.json();
        console.log(data.data);
        setEvents(data.data.events);
    };

    const fetchFormData = async (selectedEvent) => {
        if (selectedEvent === "select") {
           resetForm();
            return;
        }

        const response = await fetch(`https://us-central1-techspardha-87928.cloudfunctions.net/api2/events/description?eventCategory=${selectedCategory}&eventName=${selectedEvent}`);
        const data = await response.json();
        console.log(data);
        let startDateTime = getDateTime(new Date(data.data.startTime));
        let endDateTime = getDateTime(new Date(data.data.endTime));

        setFormData({ ...data.data });
        setStartDate(startDateTime.date);
        setStartTime(startDateTime.time);
        setEndDate(endDateTime.date);
        setEndTime(endDateTime.time);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        fetchEvents(e.target.value);
    };

    function getDateTime(timestamp) {
        console.log(timestamp)
        let myDate = {
            date: null,
            time: null,
        };

        let date = timestamp.toLocaleDateString();
        let z = date.split("/");
        z.reverse();
        if (z[1]?.length == 1) {
            z[1] = "0" + z[1];
        }

        if (z[2]?.length == 1) {
            z[2] = "0" + z[2];
        }

        //swap month and date to match html date format
        // let m = z[1];
        // z[1] = z[2];
        // z[2] = m;
        myDate.date = z.join("-");
        myDate.time = timestamp.toTimeString().slice(0, 8);

        return myDate;
    }

    const handleEventChange = (e) => {
        setSelectedEvent(e.target.value);
        fetchFormData(e.target.value);
    };

    const handleFlagshipChange = (e) => {
        setFormData({ ...formData, flagship: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("image", file);
        const resonse = await fetch("https://api.imgbb.com/1/upload?key=a2893465e2bc473776aaf3303dfed76f", {
            method: "POST",
            body: formData,
        });
        const data = await resonse.json();
        console.log(data);
        setFormData({ ...formData, poster: data.data.url });
    }

    const handleRuleChange = (index, rule) => {
        const rules = formData?.rules;
        rules[index] = rule;
        setFormData({ ...formData, rules });
    };

    const handleCoordinatorChange = (index, coordinator) => {
        const coordinators = formData?.coordinators;
        coordinators[index] = coordinator;
        setFormData({ ...formData, coordinators });
    };

    const handleRemoveCoordinator = (index) => {
        const coordinators = formData?.coordinators;
        coordinators.splice(index, 1);
        setFormData({ ...formData, coordinators });
    };

    const handleRemoveRule = async (index) => {
        const rules = formData?.rules;
        rules.splice(index, 1);
        setFormData({ ...formData, rules });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if(image === null || formData.poster === "") {
            alert("Please upload a poster.");
            return;
        }

        if(image) {
            // setFormData({ ...formData, poster: data.data.url });
            // setImage(null);
        }

        if (selectedCategory === "select" || selectedEvent === "select") {
            alert("Please select a category and event.");
            return;
        }

        if (!formData.eventName.trim()) {
            alert("Please enter the event name.");
            return;
        }

        if (!formData.description.trim()) {
            alert("Please enter the event description.");
            return;
        }

        if (!startDate || !startTime || !endDate || !endTime) {
            alert("Please enter start and end date/time.");
            return;
        }

        // Additional validation for date/time format can be added here

        console.log(formData);
        // fetch("https://us-central1-techspardha-87928.cloudfunctions.net/api2/events", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("Success:", data);
        //         alert("Event Added Successfully");
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         alert("Error Adding Event");
        //     });
    };

    useEffect(() => {
        if (formData?.startTime && formData?.endTime) {
            const startDateTime = new Date(formData?.startTime);
            const endDateTime = new Date(formData?.endTime);
            console.log(startDateTime);
            console.log(endDateTime);
            startDateTime.setHours(startTime.split(":")[0]);
            startDateTime.setMinutes(startTime.split(":")[1]);
            endDateTime.setHours(endTime.split(":")[0]);
            endDateTime.setMinutes(endTime.split(":")[1]);
            setFormData({ ...formData, startTime: startDateTime, endTime: endDateTime });
        }
    }, [startTime, endTime]);

    return (
        <div className="container mt-3">
            {/* add toggle to add or upate event */}
            {isEdit ? <h1>Update Event</h1> : <h1>Add Event</h1>}
            {/* toggle */}
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => setIsEdit(!isEdit)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                    {isEdit ? "Update Event" : "Add Event"}
                </label>
            </div>

            <hr />

            <form onSubmit={handleFormSubmit} className="container">
                <div className="form-group">
                    <label htmlFor="category">Select Category</label>
                    <select
                        name="category"
                        id="category"
                        disabled={categories.length === 0}
                        className="form-control"
                        value={selectedCategory}

                        onChange={handleCategoryChange}
                    >
                        <option value="select">Select Category</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                {isEdit && (
                    <div className="form-group">
                        <label htmlFor="event_name">Event Name</label>
                        <select
                            name="events"
                            id="events"
                            disabled={selectedCategory === "select" || events.length === 0}
                            className="form-control"
                            value={selectedEvent}
                            onChange={handleEventChange}
                        >
                            <option value="select">Select Event</option>
                            {events?.map((event, index) => (
                                <option key={index} value={event.eventName}>
                                    {event.eventName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {!isEdit && (
                    <div className="form-group">
                        <label htmlFor="event_name">Event Name</label>
                        <input
                            type="text"
                            name="event_name"
                            id="event_name"
                            placeholder="Enter Event Name"
                            className="form-control"
                            value={formData?.eventName}
                            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                        />
                    </div>
                )}
                {(selectedCategory !== "select" && selectedEvent !== "select" || !isEdit) && (
                    <>
                        <div className="form-group">
                            <label htmlFor="event_name">isFlagShip</label>
                            <br />
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    name="flagship"
                                    id="true"
                                    className="form-check-input"
                                    disabled={selectedEvent === "select"}
                                    // value={true}
                                    checked={formData?.flagship == true}
                                    onChange={handleFlagshipChange}
                                />
                                <label htmlFor="true" className="form-check-label">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    name="flagship"
                                    id="false"
                                    disabled={selectedEvent === "select"}
                                    className="form-check-input"
                                    // value={false}
                                    checked={formData?.flagship == false}
                                    onChange={handleFlagshipChange}
                                />
                                <label htmlFor="false" className="form-check-label">
                                    No
                                </label>
                            </div>
                        </div>
                        <div className="form-group times">
                            <div className="time_container">
                                <label htmlFor="startDate">Start Date (Tentative)</label>
                                <input
                                    type="date"
                                    name="startDate"

                                    disabled={selectedEvent === "select"}
                                    id="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="time_container">
                                <label htmlFor="startTime">Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    id="startTime"
                                    disabled={selectedEvent === "select"}
                                    className="form-control"

                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group times">
                            <div className="time_container">
                                <label htmlFor="endDate">End Date (Tentative)</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    disabled={selectedEvent === "select"}
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="time_container">
                                <label htmlFor="endTime">End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    id="endTime"
                                    disabled={selectedEvent === "select"}
                                    className="form-control"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="venue">Venue</label>
                            <input
                                type="text"
                                name="venue"
                                id="venue"
                                disabled={selectedEvent === "select"}
                                className="form-control"
                                value={formData?.venue}
                                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="event_description">Event Description</label>
                            <textarea
                                name="event_description"
                                id="event_description"
                                className="form-control"
                                rows={10}
                                value={formData?.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }

                            />
                        </div>
                        <div className="form-group mt-2" id="rules_container">
                            <label htmlFor="rules">
                                Rules
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleAddRule}
                                >
                                    Add Rule
                                </button>
                            </label>
                            {formData?.rules?.map((rule, index) => (
                                <Rule
                                    key={index}
                                    rule={rule}

                                    index={index}
                                    handleRuleChange={handleRuleChange}
                                    handleRemoveRule={handleRemoveRule}
                                />
                            ))}

                        </div>
                        <div className="form-group  mt-2" id="coordinators">
                            <label htmlFor="coordinators">
                                Coordinators
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleAddCoordinator}

                                >
                                    Add Coordinator
                                </button>
                            </label>
                            {formData?.coordinators?.map((coordinator, index) => (
                                <Coordinator
                                    key={index}
                                    coordinator={coordinator}
                                    index={index}
                                    handleCoordinatorChange={handleCoordinatorChange}
                                    handleRemoveCoordinator={handleRemoveCoordinator}
                                />
                            ))}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="poster">Upload Image/ Poster</label>
                            <input
                                type="file"
                                name="poster"
                                id="poster"
                                disabled={selectedEvent === "select"}
                                className="form-control"
                                onChange={handleFileChange}
                            />
                            {/* image preview */}
                            {(image || formData?.poster) && (
                                <img
                                    src={image || formData?.poster}
                                    alt="poster"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                           
                        </div>
                        <div className="form-group">
                            <label htmlFor="document">
                                Add any document / Folder Link (Google drive) for results or any info about
                                event
                            </label>
                            <input
                                type="text"
                                name="document"
                                id="document"
                                className="form-control"
                                disabled={selectedEvent === "select"}
                                value={formData?.document}
                                onChange={(e) =>
                                    setFormData({ ...formData, document: e.target.value })
                                }

                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Events;