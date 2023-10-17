import { asyncAddQuestion } from 'Redux/reducer/questionReducer'
import { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./NewPage.css"

function NewPage() {

    const userInfo = useSelector(state => state?.user?.info)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [questionInfo, setQuestionInfo] = useState({ optionOneText: "", optionTwoText: "" })
    const [loading, setLoading] = useState(false)

    const handleChangeInput = (event) => {
        setQuestionInfo(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(asyncAddQuestion({ ...questionInfo, author: userInfo?.id }))
        setTimeout(() => navigate("/"), 1000)
    }

    return (
        <div className="NewPage__box">
            <h5 className="mx-auto my-1">Would You Rather</h5>
            <div>Create Your Own Poll</div>
            <Form className="LoginPage__formBox" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="LoginPage__label" htmlFor="optionOneText">First Option:</Form.Label>
                    <Form.Control
                        value={questionInfo.optionOneText}
                        onChange={handleChangeInput}
                        required
                        id="optionOneText"
                        type="text"
                        placeholder="Option One"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="LoginPage__label" htmlFor="optionTwoText">Second Option:</Form.Label>
                    <Form.Control
                        value={questionInfo.optionTwoText}
                        onChange={handleChangeInput}
                        required
                        id="optionTwoText"
                        type="text"
                        placeholder="Option Two"
                    />
                </Form.Group>
                {loading ?
                    <Button
                        className="LoginPage__btnLogin"
                        variant="primary"
                        disabled
                    >
                        <Spinner animation='border' size='sm' />
                    </Button>
                    :
                    <Button
                        className="LoginPage__btnLogin"
                        type='submit'
                        variant="primary"
                    >
                        Submit
                    </Button>
                }
            </Form>
        </div>
    )
}

export default NewPage