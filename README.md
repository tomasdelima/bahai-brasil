# Bahá'í Brasil

Este repositório contém o projeto do aplicativo web em Ruby e React e o projeto do aplicativo móvel em React Native

## Rodando o aplicativo móvel

Vá para a página do aplicativo:

    cd mobile

Instale as dependências:

    npm install

Caso queira desenvolver em iOS:

    react-native run-ios

Caso queira desenvolver em Android:

    react-native run-android

Caso o aplicativo não instale imediatamente, siga os passos em https://facebook.github.io/react-native/docs/running-on-device.html

Para gerar um build para iOS, siga as instruções em https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/TestingYouriOSApp/TestingYouriOSApp.html

Para gerar um build de debug para Android, basta rodar:

    ./build debug

Para gerar um build de produção para Android, basta rodar:

    ./build release

Nos casos de build para produção, é necessário ter os arquivos de licença/assinatura (que comprovam que você tem o direito sobre aquele aplicativo e para evitar que ele seja falsificado). Fale com um dos desenvolvedores para ter acesso a esses arquivos.

## Rodando o aplicativo web

Instale o RVM, Ruby e o Ruby on Rails em https://rvm.io/

Instale o Bundler:

    gem install bundler

Instale as dependências do Rails:

    bundle install

Instale as dependências do React:

    npm install

Rode o servidor:

    rails server

`Nota: o aplicativo móvel obtem os dados do aplicativo web em produção, portanto não depende do aplicativo web rodando em desenvolvimento.`

## Documentação da edição de páginas

Negrito: `*o seu texto em negrito aqui*` ou `[bold:o seu texto em negrito aqui]`
Itálico: `/o seu texto em itálico aqui/` ou `[italic:o seu texto em itálico aqui]`
Sublinhado: `_o seu texto sublinhado aqui_`

Títulos: qualquer linha precedida por múltiplos `#`, onde a quantidade de `#` indica o sub-nível do título. Ex.:

    # Título
    ## Sub-título 1
    ## Sub-título 2
    ### Sub-sub-título 2.1

Banner: `[banner:http://url.da/sua/imagem/aqui.gif]`
Imagem: `[image:http://url.da/sua/imagem/aqui.jpg]` ou `[image:left:http://url.da/sua/imagem/aqui.jpg]` ou `[image:right:http://url.da/sua/imagem/aqui.jpg]`, onde os índices `left` e `right` indicam se a imagem deva ser jogada à esquerda ou à direita, respectivamente, com relação ao texto ao redor. Tembém é possível fazer com que, ao clicar na imagem, o usuário seja direcionado para uma página; para isso utilize o padrão `[image:http://url.da/sua/imagem/aqui.jpg:http://sua.url/aqui]` ou `[image:left:http://url.da/sua/imagem/aqui.jpg:http://sua.url/aqui]` ou `[image:right:http://url.da/sua/imagem/aqui.jpg:http://sua.url/aqui]`
URL: `[url:http://sua.url/aqui]` ou `[url:clique aqui:http://sua.url/aqui]`
YouTube: `[youtube:XXXXXXXXXX]`, onde `XXXXXXXXXX` é o ID do vídeo. O ID do vídeo é encontrado na URL do vídeo no YouTube. Ex.: em `https://www.youtube.com/watch?v=K-Kd14lwuyI`, o ID é `K-Kd14lwuyI`

Alinhamento à esquerda: `[left:seu texto à esquerda:left]` ou `[l:seu texto à esquerda:l]` ou `<left:seu texto à esquerda:left> ou <l:seu texto à esquerda:l>`
Alinhamento à direita: `[right:seu texto à direita:right]` ou `[r:seu texto à direita:r]` ou `<right:seu texto à direita:right>` ou `<r:seu texto à direita:r>`
Alinhamento ao centro: `[center:seu texto ao centro:center]` ou `[c:seu texto ao centro:c]` ou `<center:seu texto ao centro:center>` ou `<c:seu texto ao centro:c>`
Alinhamento justificado: `[justify:seu texto justificado:justify]` ou `[j:seu texto justificado:j]` ou `<justify:seu texto justificado:justify>` ou `<j:seu texto justificado:j>`

Disposição em colunas: para dispor o conteúdo em colunas, é necessário definir onde as colunas têm início e fim:

    <columns: ... :columns>

Em seguida, definimos as colunas. Cada coluna tem a largura relativa de até 12 repartições. Por exemplo, podemos definir 3 colunas, onde uma terá largura 5/12, outra largura 4/12 e outra largura 3/12. A sintaxe de colunas então fica:

    <columns:
      <column:X:o conteúdo da sua coluna aqui:column>
      <column:Y:o conteúdo da sua coluna aqui:column>
      <column:Z:o conteúdo da sua coluna aqui:column>
    :columns>

, onde X, Y e Z são as larguras de cada coluna. Note que é possível definir inúmeras colunas, porém as colunas que não couberem nas 12 repartições, serão dispostas em uma nova linha com outras 12 repartições. Caso queira dividir uma única coluna em outras sub-colunas, utilize "columns2" e "column2" da seguinte forma:

    <columns:
      <column:X:
        <columns2:
          <column2:X:o conteúdo da sua coluna aqui:column2>
          <column2:Y:o conteúdo da sua coluna aqui:column2>
          <column2:Z:o conteúdo da sua coluna aqui:column2>
        :columns2>
      :column>
      <column:Y:o conteúdo da sua coluna aqui:column>
      <column:Z:o conteúdo da sua coluna aqui:column>
    :columns>

Nova linha: caso o caracter `enter` não seja efetivo na quebra de linha, é possível utilizar o padrão `\n`. Ex.: `Esta é a linha 1. \n E esta é a linha 2.`

Citação: `[quote:sua citação aqui:quote]` ou `sua citação aqui`

Cores: dois sistemas de cores são adotados:
  - Sistema RGB no formato hexadecimal: as três cores básicas (vermelho, verde e azul, respectivamente) são representadas numa escala de 0 até 255. Portanto, para formar a cor vermelha, precisamos de ter 255 de vermelho, 0 de verde e 0 de azul; alternadamente, para obtermos o amarelo precisamos de 255 de vermelho, 255 de verde e 0 de azul, etc. Porém a representação destes números deve ser feita na base hexadecimal, onde um número varia de 0 até FF.
  - Sistema de cores em inglês: este sistema é bem simples, pois utiliza o nome das cores em inglês. Para uma referência completa das possíveis cores, acesse https://www.w3schools.com/cssref/css_colors.asp.
  - Uma sugestão de seleção de cores é através do site: https://www.w3schools.com/colors/colors_picker.asp, onde as cores são exibidas no formato RGB hexadecimal.

Cor do texto: `[color:sua-cor-aqui:seu texto colorido aqui:color]` ou `<color:sua-cor-aqui:seu texto colorido aqui:color>`
Cor de fundo: `[bg:sua-cor-aqui:seu fundo colorido aqui:bg]` ou `<bg:sua-cor-aqui:seu fundo colorido aqui:bg>`

Referência a outras páginas: caso queira exibir todo o conteúdo de uma página dentro de outra, é necessário fazer referência a ela. Para tal, utilize o padrão `[page:identificador-da-pagina]`
Também é possível fazer com que parte do conteúdo da página que for referenciada seja flexível e dinâmica, fazendo uso de argumentos: `[page:identificador-da-pagina:argumento 1:argumento 2: ... ]`
Todos os argumentos podem ser utilizados na página referenciada com o seguinte padrão: `[argument:X]`
, onde X é o índice do argumento. Exemplo: na página de "citação", temos o seguinte:

    "[argument:1]"
    - [argument:2]

e numa outra página qualquer, fazemos referência a esta página da seguinte forma:

    [page:citação:Tão potente é a luz da unidade que pode iluminar toda a  Terra:Bahá'u'lláh]

Texto literal: para escapar da interpretação de qualquer regra acima, utilize `[literal:o texto que voce quizer escapar:literal]`. Ex.: No caso de `[literal:estes são dois asteríscos **:literal]`, os caracteres `**` serão impressos normalmente, sem que sejam interpretados como negrito
Caracter literal: para escapar um caracter específico, utilize `\X` onde `X` é o caracter a ser escapado. Ex.: Para escrever uma data no formato `31/12/2000`, devemos escrever `31\/12\/2000`, caso contrário o número `12` será impresso em itálico e as barras sumirão.

## Resumo:

Literal: `[literal:texto:literal]` ou `\X`

Colunas: `<columns: ... :columns>` e `<column:numero:texto:column>`

Esquerda: `[l:texto:l]` ou `[left:texto:left]` ou `<l:texto:l>` ou `<left:texto:left>`

Centro: `[c:texto:c]` ou `[center:texto:center]` ou `<c:texto:c>` ou `<center:texto:center>`

Direita: `[r:texto:r]` ou `<r:texto:r>` ou `[right:texto:right]` ou `<right:texto:right>`

Justificado: `[j:texto:j]` ou `<j:texto:j>` ou `[justify:texto:justify]` ou `<justify:texto:justify>`

Referêcia à página: `[page:texto]` e `[argument:texto]`

Banner: `[banner:url-da-imagem]`

Imagem: `[image:left:url-da-imagem]` ou `[image:right:url-da-imagem]` ou `[image:left:url-da-imagem:url-ao-clicar]` ou `[image:right:url-da-imagem:url-ao-clicar]`

URL: `[url:url-ao-clicar]` ou `[url:texto:url-ao-clicar]`

YouTube: `[youtube:texto]`

Nova linha: `\n`

Título: `# Texto` ou `## Texto` ou `### Texto` ou `#### Texto` ou `##### Texto` ou `###### Texto`

Negrito: `*texto*` ou `[bold:texto:bold]`

Itálico: `/texto/`

Sublinhado: `_texto_`

Citação: `texto` ou `[quote:texto:quote]`

Cor do texto: `[color:sua-cor:texto:color]` ou `<color:sua-cor:texto:color>`

Cor de fundo: `[bg:cor:texto:bg]` ou `<bg:cor:texto:bg>`
