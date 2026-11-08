# FCOM · Carro

PWA *mobile-first* para acompanhar boleias, quilometragem, carregamentos e intervenções do carro FCOM. Parte do histórico de `Fcom_Boleias.xlsx`, mas calcula os resumos diretamente a partir dos registos: não é necessário manter fórmulas ou criar meses manualmente.

## Indicadores

- `€/100 km` = carregamentos do mês ÷ quilómetros percorridos no mês × 100.
- `€/100 km pessoais` usa apenas os quilómetros mensais que não são FCOM.
- Os km FCOM são calculados pela posição de João Duarte nos ocupantes. As duas distâncias de ida e volta são configuráveis em **Dados**.

## Carregamentos

- **Cartão** permite indicar manualmente o valor pago.
- **Carregar em casa** calcula o custo a partir da autonomia antes/depois, consumo, perdas, preço de eletricidade e IVA.
- **Carregar na empresa** usa o mesmo consumo, perdas e IVA de casa, mas aplica o campo **Preço kWh empresa** configurado em **Dados**. O registo conserva a tarifa aplicada, pelo que alterações futuras não mudam o histórico.
- **Fatura · empresa reembolsa** mantém o registo sem custo pessoal.

## Executar localmente

```powershell
python -m http.server 4173
```

Abra `http://localhost:4173`. A aplicação começa com o histórico importado do Excel e depois guarda alterações em `localStorage` deste dispositivo.

## Cópia e sincronização

Os dados vivem num único ficheiro: `fcom-carro.json`. 
Em **Dados**, pode exportar/importar esse ficheiro e ligar ao Google Drive. 
Para a sincronização, crie um OAuth Client ID do tipo **Web application**, ative a Google Drive API e configure as origens autorizadas para `http://localhost:4173` e para o domínio final do GitHub Pages. 
Não coloque um *client secret* na aplicação.

## GitHub Pages

O workflow em `.github/workflows/deploy-pages.yml` publica a PWA em cada *push* para `main`. Depois de criar e associar o repositório GitHub, em **Settings → Pages** selecione **Source: GitHub Actions**.
