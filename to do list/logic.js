class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.changeInput = this.changeInput.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  addNewTask() {
    if (this.state.value === "") {
      return;
    }

    this.props.handle(this.state.value);
  }

  changeInput(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="inputWrap">
        <input
          className="InputBar"
          value={this.state.value}
          onChange={this.changeInput}
          type="text"
        />
        <button onClick={this.addNewTask}>Add</button>
      </div>
    );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        style={{ display: this.props.isDone ? "none" : "block" }}
        onClick={this.props.handleChangeItemList}
        value={this.props.value}
      >
        <div
          className={
            "listItem listHeader" + this.props.isStar ? "starListItem" : ""
          }
        />
        {this.props.value}
        <button onClick={this.props.handleRemoveItem} className="rmvBtn" />
        <button onClick={this.props.handleStarReplacement} className="starBtn" />
      </li>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
    this.changeTaskStar = this.changeTaskStar.bind(this);
    this.addNewTaskToList = this.addNewTaskToList.bind(this);
    this.changeItemList = this.changeItemList.bind(this);
    this.removeItem = this.removeItem.bind(this)
    this.sendItemToTop = this.sendItemToTop.bind(this)

  }

  removeItem(key) {
    let tmpList = this.state.list;
    tmpList.splice(key, 1);
    this.setState({
      list: tmpList
    });

  }

  // theres a bug here, ask about me.
  sendItemToTop(item, key) {
    let tmpList = this.state.list;
    tmpList.splice(key, 1);
    tmpList = [item.value, ...tmpList];
    this.setState({
      list: tmpList
    });
  }

  addNewTaskToList(newTaskValue) {
    let valList = this.state.list.map((item, key) => item.value);

    if (valList.includes(newTaskValue)) return;

    this.setState({
      list: [
        ...this.state.list,
        { value: newTaskValue, isStar: false, isDone: false }
      ]
    });
  }

  changeItemList(event) {
    let newList = [];
    this.state.list.forEach(item => {
      if (item.value == event.target.getAttribute("value"))
        item.isDone = !item.isDone;
      newList.push(item);
    });

    this.setState({ list: newList });
  }

  changeTaskStar(event, isStar) {
    for (let i = 0; i < this.state.list.length; i++) {
      if (listItem["value"] == event.target.value) {
        let tmpList = list.splice();
        tmpList[i] = {
          value: tmpList[i].value,
          isStar: isStar,
          listType: tmpList[i].listType
        };

        this.setState({
          list: tmpList
        });
      }
    }
  }

  render() {
    return (
      <div className="Main">
        <Input handle={this.addNewTaskToList} />
        <div className="ListWrap">
          <h1 className="ToDoHeader">To Do:</h1>
          <ul>
            {this.state.list.map((item, key) => (
              <ListItem
                key={key}
                className={item.isStar ? "starListItem" : ""}
                isDone={item.isDone}
                handleChangeItemList={this.changeItemList}
                handleRemoveItem={() => this.removeItem(key)}
                handleStarReplacement={() => this.sendItemToTop(item, key)}
                value={item.value}
              />
            ))}
          </ul>
        </div>
        <div className="ListWrap">
          <h1 className="ToDoHeader">Completed:</h1>
          <ul className="Mainlist">
            {this.state.list.map((item, key) => (
              <ListItem
                key={key}
                className={item.isStar ? "starListItem" : ""}
                handleChangeItemList={this.changeItemList}
                handleRemoveItem={() => { this.removeItem(key) }}
                isDone={!item.isDone}
                value={item.value}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
