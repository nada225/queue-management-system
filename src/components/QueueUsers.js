import React, { Component } from 'react'

export const  QueueUsers= ({users})=>  {


        return (
            <div className="card mt-5">
                <div className="card-body">
                    <ul className="list-group">
                        {users.map(i => (
                            <li className="list-group-item">{i.id}:{i.name}</li>
                        ))}
                    </ul>
                    
                </div>
            </div>
        )
    }


export default QueueUsers
