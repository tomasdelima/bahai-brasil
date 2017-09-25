import React from 'react'
import Page from '../page'

export default class Elements extends React.Component {
  renderByClassName () {
    var {fragment, renderString, compileFragment, i} = this.props
    var className = fragment.constructor.name

    switch (className) {
      case 'String':
        return <span key={i} className="string" style={[s.inline].merge()}>{fragment}</span>
      case 'Array':
        return <span key={i} className="array" style={[s.rect(), s.inline].merge()}>{fragment.map((item, i) => compileFragment(item, i))}</span>
      default:
        return null
    }
  }

  renderByRuleName () {
    var {fragment, renderString, compileFragment, i} = this.props

    switch (fragment.rule) {
      case 'literal':
        return <span key={i} className="literal">{fragment.content}</span>
      case 'columns':
        return <div key={i} className="columns" style={[s.flex, s.wrap].merge()}>{fragment.content.map((item, i) => compileFragment(item, i))}</div>
      case 'column':
        return <div key={i} className="column" style={[s.wide(100*fragment.content[1]/12 + "%"), s.minWidth(fragment.content[1] * 30), s.shrink(0)].merge()}>
          <div style={s.padding(5)}>
            {renderString(fragment.content[2])}
          </div>
        </div>
      case 'page':
        var args = fragment.content.split(":")
        return <Page slug={args[0]} args={args} preventEditorMode />
      case 'argument':
        return <span key={i} className="argument">{this.props.args[fragment.content]}</span>
      case 'image':
        var style = fragment.content[2] ? [s.maxWidth(), s.padding(10), {float: fragment.content[2]}] : [s.wide()]
        return <img key={i} className="image" style={style.merge()} src={fragment.content[3]}/>
      case 'left':
      case 'center':
      case 'right':
      case 'justify':
        return <div key={i} className="alignment" style={{textAlign: fragment.rule}}>{renderString(fragment.content[2])}</div>
      case 'heading':
        return React.createElement("h" + fragment.content[1].length, {key: i, className: 'heading', style: [s.padding(10)].merge()}, fragment.content[2])
      case 'url':
        var url = fragment.content
        return <a key={i} className="url" style={[s.url]} href={url[3]}>{url[2] || url[3]}</a>
      case 'color':
        return <div key={i} className="color" style={{color: fragment.content[1]}}>{renderString(fragment.content[2])}</div>
      case 'bg':
        return <div key={i} className="bg" style={[s.rect(), {backgroundColor: fragment.content[1]}].merge()}>{renderString(fragment.content[2])}</div>
      case 'new-line':
        return <br key={i} />
      default:
        null
    }
  }

  renderObject () {
    var {fragment, renderString, compileFragment, i} = this.props
    var className = fragment.constructor.name

    if (className == 'Object') {
      return <span key={i} className={fragment.rule} style={s[fragment.rule]}>{compileFragment(fragment.content)}</span>
    } else {
      console.error('ERROR!!!: UNKNOWN FRAGMENT: ' + JSON.stringify(fragment))
      return null
    }
  }

  render () {
    if (this.props.fragment.match && this.props.fragment.match(/^\s*$/)) {
      return null
    } else {
      return this.renderByClassName() || this.renderByRuleName() || this.renderObject()
    }
  }
}