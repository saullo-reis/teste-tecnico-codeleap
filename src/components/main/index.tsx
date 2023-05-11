import { BsFillTrashFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import './styleMain.sass'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { useNavigate } from 'react-router-dom'
import { ModalDelete } from './modals/modalDelete/modalDelete'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ModalEdit } from './modals/modalEdit/modalEdit'
import { DataType, PostsType } from '../../utils/utils'
import moment from 'moment'
import { Loading } from '../loading/loading'

export const Main = () => {
    const [posts, setPosts] = useState<PostsType[]>([])
    const navigate = useNavigate()
    const name = useSelector((state: RootState) => state.name.name);
    const [data, setData] = useState<DataType>({
        name: name,
        title: '',
        content: ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [id, setId] = useState<number>()
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [refreshPosts, setRefreshPosts] = useState(0)
    const [editPostState, setEditPost] = useState<DataType>({
        title: '',
        content: ''
    })
    const url = 'https://dev.codeleap.co.uk/careers/'
    const now = moment()


    useEffect(() => {
        if (name === 'none') {
            navigate('/')
        }
        async function fetchData() {
            const response = await axios(url)
            setPosts(response.data.results)
            setTimeout(() => {
                setIsLoading(true)
            }, 1000);

        }
        fetchData()
    }, [isModalOpenDelete, refreshPosts, isModalOpenEdit])

    const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`${url + id}/`, {
                title: editPostState.title,
                content: editPostState.content
            })
            if (response.status === 200) {
                toast.success(`Post do id ${id} atualizado com sucesso`)
            }
            setIsModalOpenEdit(false)
        } catch (err) {
            console.error(err)
        }
    }

    const deletePost = async () => {
        try {
            const response = await axios.delete(`${url + id}/`)
            if (response.status === 204) {
                toast.success(`Post do id ${id} removido`)
            }
            setIsModalOpenDelete(false)
        } catch (err) {
            console.error(err)
        }

    }

    const postSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.post(url, {
                username: data.name,
                title: data.title,
                content: data.content
            })
            setData({ title: '', content: '', name: name })
            toast.success(`Post criado`)
            setRefreshPosts(refreshPosts + 1)
        }
        catch (err) {
            return console.error(err)
        }

    }

    const handleModalOpen = (id?: number, mode?: string) => {
        switch (mode) {
            case 'trash':
                setId(id)
                setIsModalOpenDelete(true)
                return
            case 'edit':
                setId(id)
                setIsModalOpenEdit(true)
                return
        }
    };

    const handleModalClose = () => {
        setIsModalOpenDelete(false)
        setIsModalOpenEdit(false)
    };

    const dateNow = (date: string) => {
        const createdAt = new Date(date)
        const diff = moment.duration(now.diff(createdAt))
        const minutesAgo = diff.asMinutes()
        const roundedMinutesAgo = Math.round(minutesAgo)
        if (roundedMinutesAgo === 0) {
            return 'posted now'
        }
        return roundedMinutesAgo + ' minutes ago'
    }


    return (<>{!isLoading ? <Loading /> : <section className='main'>
        <ModalDelete isOpen={isModalOpenDelete} onClose={handleModalClose}>
            <h2 className='title-modal'>Are you sure you want to delete this item?</h2>
            <div className='buttons' >
                <button className='buttons-cancel' onClick={handleModalClose}>Cancel</button>
                <button className='buttons-delete' onClick={deletePost}>Delete</button>
            </div>
        </ModalDelete>
        <ModalEdit isOpen={isModalOpenEdit} onClose={handleModalClose}>
            <h2>Edit item</h2>
            <form className='modal-edit-form' onSubmit={editPost}>
                <label className='modal-edit-form-label'>Title</label>
                <input
                    className='modal-edit-form-title'
                    value={editPostState.title} onChange={(e) => setEditPost({
                        content: editPostState.content,
                        title: e.target.value
                    })} type={'text'}></input>
                <label className='modal-edit-form-label'>Content</label>
                <textarea value={editPostState.content} onChange={(e) => setEditPost({
                    content: e.target.value,
                    title: editPostState.title
                })} className='modal-edit-form-textarea'></textarea>
                <div className='modal-edit-buttons'>
                    <button className='modal-edit-buttons-cancel'
                        onClick={handleModalClose}>Cancel</button>
                    <input type={'submit'}
                        value="Save"
                        disabled={editPostState.content === '' || editPostState.title === ''}
                        style={{ opacity: editPostState.title === '' || editPostState.content === '' ? '60%' : '100%' }}
                        className='modal-edit-buttons-save'></input>
                </div>
            </form>
        </ModalEdit>
        <main className='main-container'>
            <h1 className='main-container-title'>CodeLeap Network</h1>
            <form className='main-container-form' onSubmit={postSubmit}>
                <h1 className='main-container-form-title'>What’s on your mind?</h1>
                <label className='main-container-form-label'>Title</label>
                <input value={data.title} onChange={(e) => setData({
                    name: name,
                    content: data.content,
                    title: e.target.value
                })} className='main-container-form-input' type={'text'}></input>
                <label className='main-container-form-label'>Content</label>
                <textarea value={data.content} onChange={(e) => setData({
                    name: name,
                    content: e.target.value,
                    title: data.title
                })} className='main-container-form-textarea'></textarea>
                <input type={'submit'}
                    value="Create"
                    disabled={data.content === '' || data.title === ''}
                    style={{ opacity: data.title === '' || data.content === '' ? '60%' : '100%' }}
                    className='main-container-form-button'></input>
            </form>
            <ul className='main-container-posts'>
                {posts.map((element: PostsType, index: number) => {
                    return (
                        <li key={index} className='main-container-posts-post' style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className='main-container-posts-post-container'>
                                <h1 className='main-container-posts-post-container-title'>{element.title}</h1>
                                <div className='main-container-posts-post-container-icons'>
                                    {element.username === name &&
                                        <>
                                            <BsFillTrashFill onClick={() => handleModalOpen(element.id, 'trash')} />
                                            <BiEdit onClick={() => handleModalOpen(element.id, 'edit')} />
                                        </>
                                    }
                                </div>
                            </div>
                            <div className='data-name'>
                                <h2 className='main-container-posts-post-name'>@{element.username}</h2>
                                <h2 className='main-container-posts-post-time'>{dateNow(element.created_datetime)}</h2>
                            </div>
                            <p className='main-container-posts-post-content'>{element.content}</p>
                        </li>
                    )
                })}

            </ul>
        </main>
        <ToastContainer position="bottom-left" />
    </section>}</>)
}