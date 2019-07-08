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
            <div>
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

    removeBtn(e) {
        e.target.parentNode.remove();
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.list.map((item, index) => (
                        <li key={index}>{item}<button onClick={() => this.putAsFirst(index)} className="starBtn"></button>
                            <button onClick={this.removeBtn} className="rmvBtn"></button></li>
                    ))}
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

        }
        this.AddTask = this.AddTask.bind(this);
        this.starTask = this.starTask.bind(this);
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
            List: [...this.state.List, newTask],
        });
    }
    render() {
        return (
            <div>
                <Input TaskAdder={this.AddTask} />

                <List list={this.state.List} starTask={this.starTask} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);