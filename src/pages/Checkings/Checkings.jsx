import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CheckBookingRow from "./CheckBookingRow";

const Checkings = () => {

    const { user } = useContext(AuthContext);
    const [checkings, setCheckings] = useState([])

    const url = `http://localhost:5000/checkings?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCheckings(data))
    }, [])

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
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkings.map(checking => <CheckBookingRow
                            key={checking._id}
                            checking={checking}
                            ></CheckBookingRow>)
                            
                        }
                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default Checkings;