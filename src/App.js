import { React, Component } from 'react';
import Select from 'react-select'
import './App.scss';

let listItem = [
  { name: 'First Item', text: 'Lorem Ipsum is Lorem Ipsum', increment: 2, priority: { priority: 2, class: 'yellow' } },
  { name: 'Second Item', text: 'Lorem Ipsum is Lorem Ipsum', increment: 1, priority: { priority: 3, class: 'red' } },
  { name: 'Third Item', text: 'Lorem Ipsum is Lorem Ipsum', increment: 0, priority: { priority: 1, class: 'green' } }
]

const options = [
  { class: 'red', label: 'Red', priority: 3 },
  { class: 'yellow', label: 'Yellow', priority: 2 },
  { class: 'green', label: 'Green', priority: 1 }
]

class H1 extends Component {
  render() {
    return (
      <h1 className={this.props.classes}>{this.props.message}</h1>
    )
  }
}

class PriorityStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let classNames = "priority-status ";
    let status = this.props.status;
    if (status) {
      classNames += status;
    }
    return (
      <div className={classNames}>
      </div>
    )
  }
}

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="control-panel">
        <span>Sort by: </span>
        <span className="sort-link" onClick={this.props.sortByIndex}>Index</span>
        <span className="sort-link" onClick={this.props.sortByPriority}>Priority</span>
      </div>
    )
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
      date: new Date()
    };
  }

  onClickRemove = (index) => {
    console.log('test')
    this.props.removeItem(this.props.index);
  }

  onClickChange = () => {
    this.setState(prevState => ({
      isChange: true
    }));
  }

  changeForm = (event) => {
    if (event.target.id === "change-title") {
      this.props.changeTitle(this.props.index, event.target.value);
    } else {
      this.props.changeText(this.props.index, event.target.value);
    }
  }

  changeSelect = (selectedOption) => {
    console.log(selectedOption)
    this.props.changeSelect(this.props.index, selectedOption.priority, selectedOption.class);
  }

  saveChange = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      isChange: false
    }));
  }

  render() {
    return (
      <li className="ListItem card-item">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-block">
                <h5 className="card-title">{this.props.name}</h5>
                {/* <p>{this.props.increment} </p> */}
                <p className="card-date">{this.state.date.toLocaleTimeString()}</p>
              </div>
              {this.props.priority ? <span><PriorityStatus status={this.props.priority.class} /></span> : <span></span>}
            </div>
            <p className="card-text">{this.props.text}</p>
            <div className="flex align-items-center">
              <button onClick={this.onClickChange} className="btn btn-primary">Change</button>
              <button onClick={this.onClickRemove} className="btn btn-danger">Delete</button>
            </div>
            <form className={this.state.isChange ? "d-block change-form" : "d-none"}>
              <label htmlFor="change-title">Change item</label>
              <input type="text" className="form-control" id="change-title" onChange={this.changeForm} />
              <textarea className="form-control" onChange={this.changeForm} id="change-text" />
              <Select placeholder="Priority" options={options} onChange={this.changeSelect} />
              <button type="submit" className="btn btn-primary" onClick={this.saveChange}>Save</button>
            </form>
          </div>
        </div>
      </li >

    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      message: 'Включено',
      value: '',
      text: '',
      items: listItem,
      selectedOptions: 0,
    };
  }

  handleChange = (event) => {
    let elem = event.target.id;
    if (elem === "input-add-title") {
      this.setState({ value: event.target.value });
    } else if (elem === "input-add-text") {
      this.setState({ text: event.target.value });
    }
  }

  addItem = (event) => {
    listItem.unshift({ name: this.state.value, text: this.state.text, increment: listItem.length + 1 ,priority: this.state.selectedOption });
    event.preventDefault();
    console.log(listItem)
    this.setState({ items: listItem });
  }

  removeItem = (index) => {
    listItem.splice(index, 1);
    this.setState({ items: listItem });
  }

  changeTitle = (index, nameValue) => {
    listItem[index].name = nameValue;
    this.setState({ items: listItem });
  }

  changeText = (index, textValue) => {
    listItem[index].text = textValue;
    this.setState({ items: listItem });
  }

  changeSelect = (index, value, className) => {
    listItem[index].priority = { priority: value, class: className };
    this.setState({ items: listItem });
  }

  getSelect = (selectedOption) => {
    this.setState({ selectedOption });
  }

  sortByPriority = () => {
    listItem.sort((a, b) => a.priority.priority < b.priority.priority ? 1 : -1);
    this.setState(listItem);
  }

  sortByIndex = () => {
    listItem.sort((a, b) => a.increment > b.increment ? 1 : -1);
    this.setState(listItem);
  }

  render() {
    const items =
      listItem.map((item, index) => (
        <ListItem
          name={item.name}
          text={item.text}
          priority={item.priority}
          key={index}
          index={index}
          increment={item.increment}
          addItem={this.addItem}
          removeItem={this.removeItem}
          changeTitle={this.changeTitle}
          changeText={this.changeText}
          changeSelect={this.changeSelect}>
        </ListItem>
      ));

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <H1 message="List items" classes="main-heading"></H1>
            <form onSubmit={this.addItem}>

              <label htmlFor="input-add" className="form-label">Add new item</label>
              <input type="text" required id="input-add-title" placeholder="Title" className="form-control" aria-describedby="passwordHelpBlock" onChange={this.handleChange} />
              <textarea type="text" id="input-add-text" placeholder="Text" className="form-control" onChange={this.handleChange} />

              <Select placeholder="Priority" options={options} onChange={this.getSelect} />

              <button type="submit" className="btn btn-primary btn-add">Submit</button>
            </form>
            <Controls sortByPriority={this.sortByPriority} sortByIndex={this.sortByIndex} />
            <ul className="list-container">
              {items}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
