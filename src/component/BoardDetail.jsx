import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {

    const { id } = useParams();

    // 특정 조건을 만족하는 요소의 index를 찾는 함수 findIndex()
    // boardList.findIndex(b => b.id === Number(id))
    // params는 String으로 값을 가져옴 ==> 따라서 Number로 형변환
    // 굳이 findIndex를 사용하는 이유 id의 값과 index(boardList)

    // const idx = boardList.findIndex(b => b.id === Number(id));
    // console.log(idx);

    // const board = boardList[idx];
    // console.log(board);

    const [ board, setBoard ] = useState(null);

    const getBoard = async()=>{
        try{
            const res = await axios(`/detail/${id}`);
            //res.data. : 데이터가 1개 더라도 배열로 들어옴
            setBoard(res.data[0]);
            console.log(res);
        }catch(error){
            //어느부분의 에러인지 try~catch 해주는게 좋다
            console.log(error)
        }
    };

    useEffect(()=>{
        getBoard();
    },[]);

    const onRemove = async () =>{
        if (window.confirm('정말 삭제 하겠습니까?')) {
            try {
                await axios.get(`/delete/${id}`); // 삭제 요청 보내기
                window.location.href = '/list'; // 삭제 후 리스트로 이동
            } catch (error) {
                console.error(error);
            }
        }
    };

    if(board != null){
        return (
            <div className='boardDetail board'>
                <h2>No.{board.id} / Board Detail Page</h2>
                <div className='content'>
                    <div className='title'>{board.title}</div>
                    <div className='writer'>작성자 : {board.writer} | 작성일 : [{board.reg_date.substring(0, board.reg_date.indexOf("T"))}]</div>
                    <div className='con'>{board.contents}</div>
                </div>
                <div>
                    <Link to={`/modify/${board.id}`}><button>Modify</button></Link>
                    <Link to={'/'}><button onClick={onRemove}>Remove</button></Link>
                    <Link to={'/'}><button>List</button></Link>
                </div>
    
            </div>
        );
    }

};

export default BoardDetail;