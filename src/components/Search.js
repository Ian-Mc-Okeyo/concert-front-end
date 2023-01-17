import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Search = () =>{
    const baseurl = 'http://127.0.0.1:8000/concert/';
    const [searchValue, setSearchValue] = useState('')
    const [attendees, setAttendees] = useState([])

    useEffect(()=>{
        axios.get(baseurl+'add-attendee/').then((Response)=>{
            setAttendees(Response.data);
            console.log(attendees);
            console.log(Response.data);
        })
    }, [])

    return (
        <>
            <div className='bg'></div>
            <div className='container row' style={{textAlign: 'center'}}>
                <h1 style={{textAlign: 'center'}}>LIGHT HOUSE CONCERT</h1>
            <form className="col-md-8 content">
                <h1>SEARCH TICKET</h1>
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-8 mb-3">
                        <label htmlFor="validationCustom01" className='form-control-lg'>Search</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            list= 'datalistOptions'
                            id="exampleDataList"
                            placeholder="Type to search..." 
                            value={searchValue} 
                            name='searchValue' 
                            onChange={(e)=>setSearchValue(e.target.value)}
                        />
                    </div>
                    <datalist id="datalistOptions">
                        {attendees.map((attendee)=>{
                            return <option value={attendee.first_name+" "+attendee.middle_name+" "+attendee.last_name+"-"+attendee.ticket_id}/>
                        })}
                    </datalist>
                </div>
            </form>
            </div>
        </>
    )
}

export default Search