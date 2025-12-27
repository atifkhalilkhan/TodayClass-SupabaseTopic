import { useParams } from "react-router";
import supabase from "../dbconfig/db";
import { useEffect, useState } from "react";

export default function ProjectScreen() {
    const params = useParams();
    const { spaceId, projectId } = params;
    const [tickets, setTickets] = useState<any>([]);

    const GetTickets = async () => {
        const { data, error } = await supabase.from('Tickets').select('*').eq('projectId', projectId).eq('spaceId', spaceId);
        if (error) {
            console.log("Error fetching tickets:", error);
        }
        else {
            console.log("Fetched tickets:", data);
            setTickets(data)
        }
    }

    const AddTickets = async () => {
        const { error } = await supabase.from('Tickets').insert({
            title: "New Ticket",
            description: "Ticket Description",
            spaceId: spaceId,
            projectId: projectId
        });
        if (error) {
            console.log("Error adding ticket:", error);
        }
        else {
            console.log("Ticket added successfully");
            GetTickets();
        }
    }


    useEffect(() => {
        GetTickets()
    }, [projectId])

    return <div>Project Screen

        <button onClick={AddTickets} className="p-2 border">Add Ticket</button>

        {tickets.map((ticket: any) => (
            <div key={ticket.id}>
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
            </div>
        ))}
    </div>

}

