import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Search = () =>{
    const baseurl = 'https://api.tickets.jkusdachurch.org/concert/';
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
            <div className='container row align-items-center justify-content-center' style={{textAlign: 'center'}}>
                <h1 style={{textAlign: 'center'}}>LIGHT HOUSE CONCERT</h1>
                <form className="col-md-12" style={{left:"50%", textAlign:"center"}}>
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
                    <h1>Tickets</h1>
                <div className="table-responsive col-md-12">
                    <table className='table table-success table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Ticket No</th>
                                <th>Ticket Type</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                            <tbody>
                                {attendees.map((attendee)=>{
                            
                                    return(
                                        <tr>
                                            <td>{attendee.first_name+" "+attendee.middle_name+" "+attendee.last_name}</td>
                                            <td>{attendee.ticket_id}</td>
                                            <td>{attendee.ticket_type}</td>
                                            <td>{attendee.email}</td>
                                            <td>{attendee.phone_number}</td>
                                            <td>{attendee.amount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>
                </div>
                </form>
                
                <div>
            </div>
            </div>
        </>
    )
}

export default Search
