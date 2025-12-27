import { useEffect, useState } from "react"
import supabase from "../dbconfig/db"
import { BABox, BAFormElement, BAModal, BAPera } from "basuite"
import { useNavigate } from "react-router"

export default function Home(){
    const [spaces, setSpaces] = useState<any>([])
  const [spaceModal, setSpaceModal] = useState(false)
  const [spaceObj, setSpaceObj] = useState<any>({})
  const navigate = useNavigate()

  const getSpaces = async () => {
    const { data, error } = await supabase.from('Space').select('*')
    if (error) {
      console.log("Error fetching spaces:", error);
    } else {
      setSpaces(data)
      console.log("Fetched spaces:", data);
    }
  }

  const save = async () => {
    const { error } = await supabase.from('Space').insert(spaceObj)
    if (error) {
      console.log("Error creating space:", error);
    } else {
      console.log("Space created successfully");
      setSpaceModal(false)
      getSpaces()
    }
  }

  useEffect(() => {
    getSpaces()
  }, [])
    return <>
    <BAModal
      title={"Create Space"}
      open={spaceModal}
      close={() => setSpaceModal(false)}
      content={<>
        <BAFormElement
          onSaveClick={save}
          model={spaceObj}
          setModel={setSpaceObj}
          formElement={[
            {
              col: 12,
              elementType: "input",
              label: "Space Name",
              key: "spaceName",
              required: true,
            },
          ]}
        />
      </>} />
    <BABox className="p-20 grid grid-cols-4 gap-5">
          {spaces.map((space: any) => (
            <BABox onClick={()=>{navigate(`/${space.id}`)}} key={space.id} className="p-10 bg-blue-200 rounded-lg mb-5">
              <BAPera>{space.spaceName}</BAPera>
            </BABox>
          ))}
      <BABox onClick={() => { setSpaceModal(true) }} className="p-10 bg-amber-200 rounded-lg cursor-pointer hover:bg-amber-300 text-center">
        <BAPera> Create Space </BAPera>
      </BABox>
    </BABox>

  </>
}