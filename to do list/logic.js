class Input extends React.Component {
    constructor() {
        super()
        this.state = {
            Inputvalue: ""
        }
        this.changeInput = this.changeInput.bind(this);
        this.localFuncAddTask = this.localFuncAddTask.bind(this);
    }

    localFuncAddTask() {
        if (this.state.Inputvalue !== "") {
            this.props.TaskAdder(this.state.Inputvalue);
            this.setState({
                Inputvalue: ""
            });
        }

    }

    changeInput(e) {
        this.setState({
            Inputvalue: e.target.value
        });
    }
    render() {
        return (
            <div className="inputWrap">
                <input value={this.state.Inputvalue} onChange={this.changeInput} type="text" ></input>
                <button onClick={this.localFuncAddTask}>press me gilad</button>
            </div>

        );
    }
}


class List extends React.Component {
    constructor() {
        super()
        this.removeBtn = this.removeBtn.bind(this);
        this.putAsFirst = this.putAsFirst.bind(this);
    }

    putAsFirst(index) {
        console.log(index);
        this.props.starTask(index);
    }

    removeBtn(index) {
        this.props.delete(index);
    }
    render() {
        return (
            <div className="listWrap">
                <ul className="Todolist">
                    <li className="listItem listHeader">to do list</li>
                    {this.props.list.map((item, index) => (
                        <li className="listItem" key={index}><span className={"listItemTxt" + this.prop.color}>{item}</span><div className="buttonWrap"><button onClick={() => this.putAsFirst(index)} className="starBtn"></button>
                            <button onClick={() => this.removeBtn(index)} className="rmvBtn"></button></div></li>
                    ))}
                </ul>

                <ul className="comepleteTask">
                    <li className="listItem listHeader">comeplete list</li>
                </ul>
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            List: [],
            color: "white"

        }
        this.AddTask = this.AddTask.bind(this);
        this.starTask = this.starTask.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(index) {
        let tempList = [...this.state.List];
        tempList.splice(index, 1);
        this.setState({
            List: tempList
        });
    }

    starTask(index) {
        let tempList = [...this.state.List];
        let tempItem = tempList[index];
        tempList.splice(index, 1);
        tempList = [tempItem, ...tempList];
        this.setState({
            List: tempList
        });
    }
    AddTask(newTask) {

        this.setState({
            List: [...this.state.List, newTask]
        });
    }
    render() {
        return (
            <div className="wraper">
                <Input TaskAdder={this.AddTask} />
                <List color={this.state.color} delete={this.deleteItem} list={this.state.List} starTask={this.starTask} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);