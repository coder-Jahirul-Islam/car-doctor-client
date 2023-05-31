import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CheckBookingRow from "./CheckBookingRow";
import Swal from "sweetalert2";

const Checkings = () => {

    const { user } = useContext(AuthContext);
    const [checkings, setCheckings] = useState([])

    const url = `http://localhost:5000/checkings?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCheckings(data))
    }, [url])


    const handleDelete = id => {
        const proceed = confirm('are you sure you want to delete');
        if (proceed) {
            fetch(`http://localhost:5000/checkings/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())

                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert("Deleted successful!")

                        const remaining = checkings.filter(checkBooking => checkBooking._id !== id);
                        setCheckings(remaining);

                    }
                })
        }

    }

    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/checkings/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "confirm" })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = checkings.filter(checkBooking => checkBooking._id !== id);
                    const updated = checkings.find(checkBooking => checkBooking._id === id);
                    updated.status = "confirm";
                    const newCheckBookings =  [updated, ...remaining];
                    setCheckings(newCheckBookings)
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl">Your Bookings: {checkings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkings.map(checking => <CheckBookingRow
                                key={checking._id}
                                checking={checking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></CheckBookingRow>)

                        }
                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default Checkings;