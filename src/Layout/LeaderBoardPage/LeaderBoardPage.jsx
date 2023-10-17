import { useEffect, useState } from 'react'
import { Image, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import "./LeaderBoardPage.css"

function LeaderBoardPage() {

    const users = useSelector(state => state.users?.allUser)
    const [usersOrdered, setUsersOrdered] = useState([])

    useEffect(() => {
        let editData = users?.map(user =>
            ({ ...user, created: countCreatedQuestion(user), answered: countAnsweredQuestion(user) })
        ) || []
        let ordered = editData.sort(compareUser)
        setUsersOrdered(ordered)
    }, [users])

    const compareUser = (userA, userB) => {
        if (userA.answered < userB.answered) {
            return 1
        } else if (userA.answered === userB.answered) {
            if (userA.created < userB.created)
                return 1
            else
                return -1
        } else
            return -1
    }


    const countCreatedQuestion = (user) => {
        return user?.questions?.length || 0
    }

    const countAnsweredQuestion = (user) => {
        return Object.entries(user?.answers || []).length
    }

    return (
        <div className="LeaderBoard__box">
            <Table striped bordered hover className="LeaderBoard__table">
                <thead>
                    <tr>
                        <th className="w-50">Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersOrdered && usersOrdered.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="LeaderBoard__userBox">
                                        <Image width={40} height={40} roundedCircle src={user.avatarURL} />
                                        <div>
                                            <div className="LeaderBoard__userName">{user.name}</div>
                                            <div className="LeaderBoard__userId">{user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{countAnsweredQuestion(user)}</td>
                                <td className="text-center">{countCreatedQuestion(user)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>

    )
}

export default LeaderBoardPage