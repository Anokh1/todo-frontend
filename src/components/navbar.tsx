import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { findTodo } from '../services/read';

export default function Navbar() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");

    const handleSearch = async () => {
        try {
            const results = await findTodo(title);
            navigate(`/results?query=${encodeURIComponent(title)}`, { state: { results } });
        } catch (error) {
            console.error('Error searching for todo:', error);
        }
    };

    const items = [
        {
            label: "Home",
            icon: 'pi pi-home',
            command: () => { navigate("/home"); }
        },
        {
            label: "Todo",
            icon: 'pi pi-pencil',
            command: () => { navigate("/todo"); }
        },
        {
            label: "Upload",
            icon: 'pi pi-file',
            command: () => { navigate("/upload"); }
        },
        {
            label: "Profile",
            icon: 'pi pi-briefcase',
            command: () => { navigate("/profile"); }
        }
    ];

    const end = (
        <div>
            <InputText placeholder='Enter Title' type='text' className='w-8rem sm:w-auto' onChange={(e) => setTitle(e.target.value)} />
            <Button onClick={handleSearch} label="Search" className='w-8rem sm:w-auto' />
        </div>
    );

    return (
        <Menubar className='menubar' model={items} end={end} />
    );

}