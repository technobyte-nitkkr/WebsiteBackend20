import React, { useState, useEffect } from "react";
import axios from "axios";
import ExportCSV from "exportjs";
import { getToken } from "./auth";

const RegisteredUsers = ({setBusy,allEvents,categories}) => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [emailForm, setEmailForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("select");
    const [selectedEvent, setSelectedEvent] = useState("select");
    
    const [mail, setMail] = useState({
        subject: "",
        heading: "",
        buttontext: "",
        buttonlink: "",
        thankyou: "",
        detail: "",
    });

    const handleCategoryChange = (e) => {
        const option = e.target.value;
        setSelectedCategory(option);
        const eventList = allEvents?.filter((event) => event.eventCategory === option)||[];
        console.log(eventList);
        setEvents(eventList);
    };

    const handleEventChange = (e) => {
        setSelectedEvent(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        
        const url ="https://us-central1-techspardha-87928.cloudfunctions.net/api2/admin/event";
        try {
            const response = await axios.get(url, {
                params: {
                    eventCategory: selectedCategory,
                    eventName: selectedEvent,
                },
                headers: { 
                    Authorization: getToken(),
                },
            });
            
            const data = response.data;
            console.log(data);
            setUsers(data.data.users);
            setInformation(
                data.data.users.length +
                " have registered for " +
                selectedCategory.replace(/\+/g, " ") +
                " > " +
                selectedEvent.replace(/\+/g, " ")
            );
        } catch (error) {
            console.error("Error fetching registered users:", error);
        }
    };

    const handleDownload = () => {
        const fileName =
            selectedCategory + "_" + selectedEvent + "_participant_list";
        fileName.replace(/ /g, "-");
        ExportCSV.toCSV(users, {
            fileName: fileName,
        });
    };

    const handleEmailForm = () => {
        setEmailForm(true);
    };

    const handleEmailChange = (e) => {
        setMail({ ...mail, [e.target.name]: e.target.value });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        // Send email implementation
        const url = "https://us-central1-techspardha-87928.cloudfunctions.net/api2/sendEmail";
        try {
            await axios.post(url, {
                subject: mail.subject,
                heading: mail.heading,
                buttontext: mail.buttontext,
                buttonlink: mail.buttonlink,
                thankyou: mail.thankyou,
                detail: mail.detail,
                eventCategory: eventCategory,
                eventName: eventName,
            });
            console.log("Email sent successfully");
            setEmailForm(false);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const setInformation = (info) => {
        document.getElementById("information").innerHTML = info;
    };

    return (
        <div className="container">
            <h2>Registered Users</h2>
            <form action="#" className="form container" id="search-event" onSubmit={handleSearch}>
                <div className="form-group mt-2">
                    <label htmlFor="category">Select Category</label>
                    <select
                        name="category"
                        id="category"
                        disabled={categories?.length === 0}
                        className="form-control input-field"
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
               <div className="form-group">
                        <label htmlFor="event_name">Event Name</label>
                        <select
                            name="events"
                            id="events"
                            disabled={selectedCategory === "select" || events.length === 0}
                            className="form-control input-field"
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
                <div className="form-group mt-2">
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-success search"
                        
                        disabled={selectedEvent === "select"}
                    />
                </div>
            </form>
            <div className="download_info">
                <span id="information"></span>
            </div>
            <div className="download container">
                <button className="btn btn-primary" id="download" onClick={handleDownload} disabled={selectedEvent==='select'}>
                    download file
                </button>
            </div>
            <div className="send_email container">
                <button className="btn btn-primary" id="send_email" onClick={handleEmailForm} disabled={selectedEvent === 'select'}>
                    Send Email
                </button>
            </div>

            <div id="email_form" hidden={!emailForm}>
                <form action="#" className="form emailForm" onSubmit={handleEmailSubmit}>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="form-control"
                            placeholder="subject"
                            value={mail.subject}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            name="heading"
                            id="heading"
                            className="form-control"
                            placeholder="heading"
                            value={mail.heading}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            name="buttontext"
                            id="buttontext"
                            className="form-control"
                            placeholder="button-text"
                            value={mail.buttontext}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            name="buttonlink"
                            id="buttonlink"
                            className="form-control"
                            placeholder="button-link"
                            value={mail.buttonlink}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input
                            type="text"
                            name="thankyou"
                            id="thankyou"
                            className="form-control"
                            placeholder="thankyou"
                            value={mail.thankyou}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <textarea
                            name="detail"
                            id="detail"
                            rows="10"
                            placeholder="type the email body"
                            className="form-control"
                            value={mail.detail}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" className="btn btn-success" value="SUBMIT" />      </div>
                </form>
            </div>

        </div>
    );
};

export default RegisteredUsers;