import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from './auth';

const MobileNotification = () => {
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://us-central1-techspardha-87928.cloudfunctions.net/api2/';
        const addMobileNoti = url + 'admin/mobilenoti';

        const data = {
            topic,
            title,
            body,
            image,
            link,
        };

        try {
            const response = await axios.post(addMobileNoti, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  getToken(),
                },
            });

            console.log(response);
            alert('Notification added');
        } catch (err) {
            window.alert('Error in adding mobile notification');
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <h1>Add Mobile Notification</h1>
            <form onSubmit={handleSubmit} className='container'>
                <div className="form-group mt-3">
                    <label htmlFor="topic">Topic</label>
                    <select
                        className="form-control"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    >
                        <option value="dev">Send Notication to dev</option>
                        <option value="allNoti">Send Notificaton to all</option>
                    </select>
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <textarea
                        className="form-control"
                        placeholder="body"
                        type="text"
                        id="body"
                        rows={7}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="imageUrl"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        className="form-control"
                        placeholder="Link"
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <input type="submit" className="btn btn-secondary" value="SUBMIT" />
                </div>
            </form>
        </div>
    );
};

export default MobileNotification;