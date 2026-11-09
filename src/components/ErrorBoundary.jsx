import React from "react";

// Se alguma parte do site falhar, mostra a mensagem em vez de uma página em branco.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Erro no site:", error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    // ao mudar de página, tenta outra vez
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <section className="container section error-box" role="alert">
        <h1 className="titulo-pagina">Ups, algo correu mal</h1>
        <p>Recarregue a página. Se voltar a acontecer, envie esta mensagem a quem gere o site:</p>
        <pre>{String(error?.stack || error?.message || error)}</pre>
        <button className="btn" onClick={() => window.location.reload()}>
          Recarregar
        </button>
      </section>
    );
  }
}
