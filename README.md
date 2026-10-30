# BringBackBleach — diário de progresso

Este diário acompanha um projeto experimental para melhorar a imagem de episódios de *Bleach* a partir de fontes DVD/480p e de Blu-rays com problemas. O objetivo é preservar os tempos originais do vídeo e melhorar a imagem sem inventar traços nem apagar textura.

![Fase atual e resultados medidos](imagens/progresso.svg)

## Estado atual

Estamos a rever exemplos de imagem para que a próxima experiência represente melhor cenas de ação, efeitos e texturas intermédias. O candidato atual melhora medidas de textura, mas a diferença ainda é subtil nas prévias revistas. Por isso, continua experimental.

O resumo completo está em [Estado.md](Estado.md).

## Como ler o gráfico

- A barra mostra as etapas do ciclo de trabalho: diagnóstico concluído, escolha de mais exemplos em curso, nova experiência e revisão final por fazer.
- As outras barras mostram a redução média de erro medida em diferentes escalas de detalhe. São medidas técnicas nas regiões analisadas, não percentagens de melhoria visual nem da conclusão do projeto.
- A validação apresentada já foi consultada durante o desenvolvimento; não é um teste cego.

Em termos simples: nas zonas medidas, a correção aproxima o detalhe pequeno e médio da referência usada; quase não altera as formas maiores. «Erro» é uma diferença calculada entre imagens, não uma avaliação direta do que as pessoas veem.

## O que estamos a resolver

- **Textura demasiado lisa:** estamos a medir o detalhe fino e intermédio e a testar uma correção limitada, em vez de aumentar a nitidez da imagem toda.
- **Poucos exemplos de ação e efeitos:** vamos rever algumas regiões narrativas adicionais antes de decidir se há dados suficientes para outro treino.
- **Melhorias numa imagem podem piorar o movimento:** os candidatos que falharam a comparação temporal ficam de fora; a versão de referência mantém-se.
- **A exportação também altera a imagem:** os controlos indicam que a conversão de cor pode retirar detalhe. Vamos voltar a este tema quando houver uma hipótese específica para testar.

## Limites deste diário

Este repositório publica apenas resumos e gráficos próprios. Não contém episódios, fotogramas, conjuntos de dados ou pesos do modelo. Os resultados são experimentais e não certificam toda a série nem a ausência de cintilação.

*Projeto de investigação independente, sem ligação oficial à obra ou aos seus titulares.*
