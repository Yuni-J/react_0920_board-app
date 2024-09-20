import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardModify = () => {

    const { id } = useParams();

    //--db에서 해당 파일 가져오기----------------
    const [ board, setBoard ] = useState(null);


    const getBoard = async ( )=>{
        try{
            const res = await axios(`/detail/${id}`);
            setBoard(res.data[0]);
            console.log(res);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getBoard();
    },[]);

    //변경코드 짜기

    
    const onChange = (e) => {
        const { name, value } = e.target;

        setBoard({
            ...board,
            [name]:value
        });
    };
    
    const onSubmit = async () => {
        try{
            const res = await axios.post(`/update/${id}`, board);
            console.log(res);
            window.location.href = `/detail/${id}`;
        }catch(error){
            console.log(error);
        }
    }

    const onReset = () => {
        setBoard({
            ...board,
            title:'',
            // writer:'',
            contents:''
        });
    };

    if(board !== null){
        return (
            <div className='boardModify'>
                <h2>Board Modify</h2>
                <div className='content'>
                    <div className='title'>
                        <input type="text" name='title' placeholder='Title' value={board.title} onChange={onChange}/>
                    </div>
                    <div className='writer'>작성자 : {board.writer} | 작성일 : [{board.reg_date.substring(0, board.reg_date.indexOf("T"))}]</div>
                    {/* <div className='writer'>
                        <input type="text" name='writer' placeholder='Writer' value={writer} onChange={onChange}/>
                        [{reg_date.substring(0, reg_date.indexOf("T"))}]
                    </div> */}
                    <div className='con'>
                        <textarea type="text" name='contents' placeholder='Content' value={board.contents} onChange={onChange}/>
                    </div>
                </div>
                <div>
                    <Link to={'/'}><button onClick={onSubmit}>Modify</button></Link>
                    <button onClick={onReset}>Reset</button>
                    <Link to={'/'}><button>List</button></Link> 
                </div>
            </div>
        );
    };

};

export default BoardModify;
