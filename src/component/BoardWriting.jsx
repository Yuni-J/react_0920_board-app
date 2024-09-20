import React, { useState } from 'react';
// import { boardList } from '../data/data';
import { Link } from 'react-router-dom';
import './BoardList.css';
import axios from 'axios';

const BoardWriting = () => {
    const [ board, setBoard ] = useState({
        title:'',
        writer:'',
        contents:''
    });
    
    const { title, writer, contents } = board;

    const onChange = (e) => {
        const{ name, value } = e.target;
        setBoard({
            ...board,
            [name]:value
        })
    }

    const onReset = () => {
        setBoard({
            ...board,
            title:'',
            writer:'',
            contents:''
        });
    };

    const onCreate = async () =>{
        //board 객체를 서버로 전송
        //board 객체의 내용 중 하나라도 null 이면 안됨
        if(title === ''){
            alert('title is null!!');
        }
        if(writer === ''){
            alert('writer is null!!');
        }
        if(contents === ''){
            alert('contents is null!!');
        }
        if(window.confirm('등록하시겠습니까?')){
            try{
                const res = await axios.post('/insert', board);
                console.log(res);
                // if(res.data[0] === 'OK'{
                // })
                //데이터 전송 후 이동
                window.location.href = "/list";
            }catch(error){
                console.log(error);
            }        
        }
    }

    return (
        <div className='boardWriting'>
            <h2>글쓰기</h2>
            <div className='content'>
                <label htmlFor="t">
                    Title
                    <input 
                    type="text"
                    id='t'
                    name='title'
                    value={title}
                    onChange={onChange}
                    placeholder='제목을 입력해주세요'
                    /> 
                </label>
                <label htmlFor="w">
                    Writer
                    <input 
                    type="text" 
                    id='w'
                    name='writer'
                    value={writer}
                    onChange={onChange}
                    />
                </label>
                <label htmlFor="c">
                    Content
                    <input 
                    type="text" 
                    id='c'
                    name='contents'
                    value={contents}
                    onChange={onChange}
                    placeholder='내용을 입력해주세요'
                    />
                </label>
            </div> 
            <Link to={'/'}><button onClick={onCreate}>Register</button></Link>
            <button onClick={onReset}>Reset</button>
        </div>
        
    );
};

export default BoardWriting;
