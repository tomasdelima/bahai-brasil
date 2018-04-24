import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Contact extends Optimized {
  initialize () {
    this.bind = ["setField", "sendForm"]
  }

  sendForm () {
    // ATTENTION: THIS METHOD SHOULD BE UPDATED AS SOON AS THE API CHANGES

    var data = {
      parte_nombre: this.state.name,
      parte_telefono: this.state.phone,
      parte_email: this.state.email,
      parte_estados: this.state.state,
      parte_ciudad: this.state.city,
      parte_comentarios: this.state.comments,
      parte_actividad: this.state.interest,
    }

    var url = "https://www.bahai.org.br/contato_enviar.php?" + $.param(data)
    this.setState({sendingForm: true})
    fetch(url, {mode: "no-cors"}).then((response) => {
      this.setState({sendingForm: false, error: null}, this.props.onClose())
    }).catch((error) => {
      this.setState({sendingForm: false, error: "Houve um erro. Por favor tente novamente mais tarde"})
    })
  }

  setField (name, value) {
    this.setState({[name]: value})
  }

  renderInputField (name) {
    return this.renderField('input', name)
  }

  renderTextInputField (name) {
    return this.renderField('textArea', name)
  }

  renderInterests () {
    const interests = [
      "Bicentenário",
      "Educação Espiritual de Crianças",
      "Empoderamento de Pré-­Jovens",
      "Círculos de Estudo",
      "Reuniões de Oração e Meditação",
      "Outras atividades promovidas pelos bahá’ís",
    ]

    return this.renderField(Flex, 'interests', interests.map(t => this.renderField('input', t, null, {type: "checkbox", style: s.wide(30)})),  {style: s.column})
  }

  renderState () {
    const states = [
      ["Selecione o estado", ""],
      ["Distrito Federal"],
      ["Acre"],
      ["Alagoas"],
      ["Amapá"],
      ["Amazonas"],
      ["Bahia"],
      ["Ceará"],
      ["Espírito Santo"],
      ["Goiás"],
      ["Maranhão"],
      ["Mato Grosso do Sul"],
      ["Mato Grosso"],
      ["Minas Gerais"],
      ["Pará"],
      ["Paraíba"],
      ["Paraná"],
      ["Pernambuco"],
      ["Piauí"],
      ["Rio de Janeiro"],
      ["Rio Grande do Norte"],
      ["Rio Grande do Sul"],
      ["Rondônia"],
      ["Roraima"],
      ["Santa Catarina"],
      ["São Paulo"],
      ["Sergipe"],
      ["Tocantins"],
    ]

    return this.renderField('select', 'state', states.map(t => <option key={t[0]} value={t[1] || t[0]}>{t[0]}</option>))
  }

  renderField (component, name, children, options={}) {
    const label = {
      name: "Nome",
      phone: "Telefone",
      email: "E-mail",
      state: "Estado",
      city: "Cidade",
      comments: "Comentários",
      interests: "Interesses",
    }[name] || name
    const m = s.isMobile()

    return <Flex key={name}>
      <Flex color={t.darkBlue} wide={options.type == 'checkbox' ? 330 : 180} end1 alignRight padding={10} size={m ? "xx-large" : "medium"}>{label}:</Flex>
      {React.createElement(component, {onChange: (e) => this.setField(name, e.target.value), style: s.wide(300), ...options}, children)}
    </Flex>
  }

  render () {
    return this.props.show ? <Flex fixed wide high zindex={12} BG={t.overlay} top={0} left={0}>
      <Flex relative BG={t.white} radius={5} text color={t.white} size={30} column padding={30}>
        <Flex className="fa fa-times" absolute right={20} top={20} color={t.darkBlue} pointer onClick={this.props.onClose}/>
        <Flex color={t.darkBlue}>Contato</Flex>
        {this.renderInputField("name")}
        {this.renderInputField("phone")}
        {this.renderInputField("email")}
        {this.renderState()}
        {this.renderInputField("city")}
        {this.renderTextInputField("comments")}
        {this.renderInterests()}
        <Button onClick={this.sendForm} label={this.state.sendingForm ? "Enviando" : "Enviar"} color={t.green} size={20}/>

        <Flex color={t.red} size={20}>{this.state.error}</Flex>
      </Flex>
    </Flex> : null
  }
}
