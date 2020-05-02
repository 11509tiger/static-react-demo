import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css'
// 声明了一个格子就是一个div 可以显示想要显示的内容
const Cell = function (props) {
  return (
    // 下面的onClick 传上来的
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  )
}
// 声明了一个棋盘 里面就是对每个格子进行了一个映射成一个 Cell
const Chessboard = function () {
  // 声明了一个表示每个格子的二维数组，数组里面还有数组
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  // 判断是否结束
  const [finished, setFinished] = useState(false)
  // 记录当前是第几次点击
  const [n, setN] = useState(0)
  const tell = (cells) => {
    for (let i = 0; i < 3; i++) {
      if (cells[i][0] === cells[i][1] && cells[i][1] === cells[i][2] && cells[i][0] != null) {
        console.log(cells[i][0] + '赢了');
        setFinished(true)
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (cells[0][i] === cells[1][i] && cells[1][i] === cells[2][i] && cells[0][i] != null) {
        console.log(cells[0][i] + '赢了');
        setFinished(true)
        break;
      }
    }
    if (cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2] && cells[0][0] != null) {
      console.log(cells[0][0] + '赢了');
      setFinished(true)
    }
    if (cells[0][2] === cells[1][1] && cells[1][1] === cells[2][0] && cells[1][1] != null) {
      console.log(cells[1][1] + '赢了');
      setFinished(true)
    }
  }
  const onClickCell = (row, col) => {
    setN(n + 1)
    // 深拷贝 改变cells 判断谁赢
    const copy = JSON.parse(JSON.stringify(cells))
    copy[row][col] = n % 2 === 0 ? 'X' : 'O';
    setCells(copy);
    tell(copy); // 获取新的去判断结果
  }
  return (
    <div>
      {cells.map((items, row) => <div className="row">
        {items.map((item, col) => <div className="col">
          <Cell text={item} onClick={() => onClickCell(row, col)} />
        </div>)}
      </div>)}
      {finished && <div className="gameOver">游戏结束</div>}
    </div>
  )
}

ReactDOM.render(<div>
  <Chessboard />
</div>, document.getElementById('root'))