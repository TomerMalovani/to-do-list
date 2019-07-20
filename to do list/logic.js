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
      <div className="input-bar">
        <input
          value={this.state.value}
          onChange={this.changeInput}
          type="text"
        />
        <button onClick={this.addNewTask}>Add</button>
      </div>
    );
  }
}
class ListTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-item">
        <div className={"list-icon " + this.props.icon} />
        <div className="list-item-title">{this.props.title}:</div>
      </li>
    );
  }
}
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoveHover: false
    };
    this.toggleOptionHandler = this.toggleOptionHandler.bind(this);
  }

  toggleOptionHandler() {
    this.setState({
      isMoveHover: !this.state.isMoveHover
    });
  }

  render() {
    return (
      <li
        className={
          this.state.isMoveHover
            ? "list-item display-list-item-border"
            : "list-item hide-list-item-border"
        }
        style={{ display: this.props.isDone ? "none" : "flex" }}
        onClick={this.props.handleChangeItemList}
        value={this.props.value}
        onMouseEnter={this.toggleOptionHandler}
        onMouseLeave={this.toggleOptionHandler}
      >
        <div
          className={
            this.props.isTextLineThrough
              ? "list-item-text list-item-text-line-through"
              : "list-item-text list-item-text-none"
          }
        >
          {this.props.value}
        </div>
        <div
          className={
            this.state.isMoveHover
              ? "display-list-item-op"
              : "hide-list-item-op"
          }
        >
          {/* <div onClick={this.props.handleStarItem} className="op-btn starBtn">
            ★
          </div> */}
          <div onClick={this.props.handleRemoveItem} className="op-btn rmvBtn">
            x
          </div>
        </div>
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
    this.removeItem = this.removeItem.bind(this)
  }

  removeItem(key) {
    let tmpList = this.state.list;
    tmpList = tmpList.splice(key, 1);
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
        <div className="header">
          <div className="header-logo" />
          <div className="text-logo">TO DO</div>
          <Input handle={this.addNewTaskToList} />
        </div>

        <ul className="list">
          <ListTitle icon="list-icon-todo" title="To Do" />
          {this.state.list.map((item, key) => (
            <ListItem
              key={key}
              className={item.isStar ? "starListItem" : ""}
              isDone={item.isDone}
              isTextLineThrough={false}
              handleChangeItemList={this.changeItemList}
              handleRemoveItem={this.removeItem}
              value={item.value}
            />
          ))}
        </ul>

        <ul className="list">
          <ListTitle icon="list-icon-completed" title="Completed" />
          {this.state.list.map((item, key) => (
            <ListItem
              key={key}
              className={item.isStar ? "starListItem" : ""}
              isTextLineThrough={true}
              handleChangeItemList={this.changeItemList}
              isDone={!item.isDone}
              value={item.value}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
