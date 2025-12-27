import { BABox, BAButton, BAInput, BAModal, BAPera } from "basuite";
import { Route, Routes, useNavigate, useParams } from "react-router";
import supabase from "../dbconfig/db";
import { useEffect, useState } from "react";
import ProjectScreen from "./ProjectScreen";

export default function SpacePage() {
    const [spaceDate, setSpaceData] = useState<any>({});
    const [projects, setProjects] = useState<any>([]);
    const [projectData, setProjectData] = useState<any>({});
    const [projectModal, setProjectModal] = useState(false);
    const [projectSaveLoader, setProjectSaveLoader] = useState(false);

    const navigate = useNavigate();

    const { spaceId } = useParams();

    const getProjects = async () => {
        const { data, error } = await supabase
            .from('Project')
            .select('*')
            .eq('spaceId', spaceId);

        if (error) {
            console.log("Error fetching projects:", error);
        } else {
            console.log("Fetched projects:", data);
            setProjects(data);
        }
    }
    const getSpaces = async () => {
        const { data, error } = await supabase
            .from('Space')
            .select('*')
            .eq('id', spaceId);

        if (error) {
            console.log("Error fetching spaces:", error);
        } else {
            console.log("Fetched spaces:", data);
            setSpaceData(data?.[0] || {});
        }
    }

    const addProject = async () => {
        const { error } = await supabase.from('Project').insert({
            name: projectData.name,
            spaceId: spaceId
        });
    }

    useEffect(() => {
        getSpaces();
        getProjects()
    }, [])

    return <>
        <BAModal
            title={"Add Project"}
            open={projectModal}
            close={() => setProjectModal(false)}
            content={<>
                <BABox>
                    <BABox>
                        <BAInput label={"Project Name"} value={projectData.name} onChange={(e: any) =>
                            setProjectData({ ...projectData, name: e.target.value })
                        } />
                    </BABox>
                    <BABox className="mt-5">
                        <BAButton
                            label="Save"
                            onClick={addProject}
                            loading={projectSaveLoader}

                        />
                    </BABox>
                </BABox>
            </>}
        />
        <BABox className="">
            <BABox className="p-2 bg-amber-200">
                <BAPera>{spaceDate?.spaceName}</BAPera>
            </BABox>
            <BABox className="grid grid-cols-12">
                <BABox className="col-span-2 p-2 h-screen border-r-2">
                    <BAPera className="font-bold">Projects</BAPera>
                    {projects.map((project: any) => (
                        <BABox onClick={() => {
                            navigate(`/${spaceId}/${project.id}`)
                        }} key={project.id} className="p-2 mt-2 bg-blue-200 rounded-lg cursor-pointer hover:bg-blue-300">
                            <BAPera>{project.name}</BAPera>
                        </BABox>
                    ))}
                    <BAButton onClick={() => {
                        setProjectModal(true)
                    }} label="Add Project" />
                </BABox>
                <BABox className="p-2 grid-cols-10">
                    <Routes>
                        <Route path="/:projectId" element={<ProjectScreen />} />
                    </Routes>
                </BABox>
            </BABox>
        </BABox>
    </>
}