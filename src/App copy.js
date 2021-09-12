import './App.css';
import { React, Component, Fragment } from 'react';

const listItem = [
  { name: 'First Item', point: 2300 },
  { name: 'Second Item', point: 2900 },
  { name: 'Third Item', point: 2500 }
]

class HelloName extends Component {
  render() {
    return (
      <h1>Hello, {this.props.name}, from React!</h1>
    )
  }
}

class ListItem extends Component {
  render() {
    return (
      <div className="ListItem">
        <ul>
          <li className="">
            {this.props.name} + {this.props.point}
          </li>
        </ul>
      </div>
    )
  }
}

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      message: 'Включено'
    };

    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleClick = this.handleClick.bind(this);
  }

  messageSet() {
    this.state.isToggleOn ? this.setState((state, props) => ({ message: 'Включено' })) : this.setState((state, props) => ({ message: 'Выключено' }))
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    this.messageSet();
  }

  modalOpen() {

  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.message}
        </button>
      </div>
    );
  }
}

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Отправленное имя: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Отправить" />
        <p>Сообщение: {this.state.value}</p>
      </form>
    );
  }
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    }

    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  modalOpen() {
    this.setState(prevState => ({
      isOpen: true
    }));
  }

  modalClose() {
    this.setState(prevState => ({
      isOpen: false
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.modalOpen}>Open</button>
        <div className={this.state.isOpen ? "d-block modal-window" : "d-none"}>
          <button onClick={this.modalClose}>Close</button>
        </div>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div>
        {listItem.map((item, index) => (
          <ListItem name={item.name} point={item.point} ></ListItem>
        ))}
        <Toggle></Toggle>
        <HelloName name="Сергей Ветров"></HelloName>
        <input type="text"></input>
        <NameForm></NameForm>
        <Modal></Modal>
      </div>
    );
  }
}

export default App;
