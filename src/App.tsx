import React, { useState } from "react";
import MaskedInput from "react-text-mask";
const validarCpf = require("validar-cpf");

const App: React.FC = () => {
  function Adicionar() {
    var Nome = (document.getElementById("inputNome") as HTMLInputElement).value;
    var Data = (document.getElementById("inputData") as HTMLInputElement).value;
    var Cpf = (document.getElementById("inputCpf") as HTMLInputElement).value;
    var Celular = (document.getElementById("inputCelular") as HTMLInputElement)
      .value;
    var Email = (document.getElementById("inputEmail") as HTMLInputElement)
      .value;
    var Endereco = (document.getElementById(
      "inputEndereco"
    ) as HTMLInputElement).value;
    var Observacoes = (document.getElementById(
      "inputObservacoes"
    ) as HTMLInputElement).value;

    const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
    const validaEmail = Email.indexOf("@");
    const CpfValido = validarCpf(Cpf);
    const contagemCelular = Celular.length;
    const contagemData = Data.length;
    if (dados == null) {
      localStorage.setItem("dadosUsuario", "[]");
      dados = [];
    }
    var auxRegistro = {
      nome: Nome,
      data: Data,
      cpf: Cpf,
      celular: Celular,
      email: Email,
      endereco: Endereco,
      observacoes: Observacoes,
    };

    dados.push(auxRegistro);
    if (
      Nome !== "" &&
      Data !== "" &&
      Cpf !== "" &&
      Celular !== "" &&
      Email !== "" &&
      Endereco !== ""
    ) {
      if (!regex.test(Nome)) {
        if (contagemData === 10) {
          if (CpfValido) {
            if (contagemCelular === 14 && Celular.substring(4, 5) === "9") {
              if (validaEmail !== -1) {
                localStorage.setItem("dadosUsuario", JSON.stringify(dados));
                window.location.href = "/";
              } else {
                alert("Este email não é válido");
                window.location.href = "/";
              }
            } else {
              alert("O celular informado não é valido");
              window.location.href = "/";
            }
          } else {
            alert("digite um cpf válido");
            window.location.href = "/";
          }
        } else {
          alert("Essa data não é valida");
          window.location.href = "/";
        }
      } else {
        alert("Campo nome não permite caracteres especiais");
        window.location.href = "/";
      }
    } else {
      alert("algum dos campos está vazio");
      window.location.href = "/";
    }
  }

  var dados = JSON.parse(localStorage.getItem("dadosUsuario") || "[]");

  function Remover(dado: any) {
    const filtrar = dados.filter((dadosUnico: any) => {
      return dadosUnico.cpf !== dado.cpf;
    });

    localStorage.setItem("dadosUsuario", JSON.stringify(filtrar));
    window.location.href = "/";
  }

  function Editar(edit: any) {
    const filtrar = dados.filter((dadosUnico: any) => {
      return dadosUnico.cpf !== edit.cpf;
    });
    var Nome = (document.getElementById(edit.nome) as HTMLInputElement).value;
    var Data = (document.getElementById(edit.data) as HTMLInputElement).value;
    var Cpf = (document.getElementById(edit.cpf) as HTMLInputElement).value;

    var Celular = (document.getElementById(edit.celular) as HTMLInputElement)
      .value;

    var Email = (document.getElementById(edit.email) as HTMLInputElement).value;
    var Endereco = (document.getElementById(edit.endereco) as HTMLInputElement)
      .value;
    var Observacoes = (document.getElementById(
      "inputObservacoesEdit"
    ) as HTMLInputElement).value;

    const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
    const validaEmail = Email.indexOf("@");
    const CpfValido = validarCpf(Cpf);
    const contagemCelular = Celular.length;
    const contagemData = Data.length;

    var auxRegistro = {
      nome: Nome,
      data: Data,
      cpf: Cpf,
      celular: Celular,
      email: Email,
      endereco: Endereco,
      observacoes: Observacoes,
    };

    filtrar.push(auxRegistro);

    if (
      Nome !== "" &&
      Data !== "" &&
      Cpf !== "" &&
      Celular !== "" &&
      Email !== "" &&
      Endereco !== ""
    ) {
      if (!regex.test(Nome)) {
        if (contagemData === 10) {
          if (CpfValido) {
            if (contagemCelular === 14 && Celular.substring(4, 5) === "9") {
              if (validaEmail !== -1) {
                localStorage.setItem("dadosUsuario", JSON.stringify(filtrar));
                window.location.href = "/";
              } else {
                alert("Este email não é válido");
                window.location.href = "/";
              }
            } else {
              alert("O celular informado não é valido");
              window.location.href = "/";
            }
          } else {
            alert("digite um cpf válido");
            window.location.href = "/";
          }
        } else {
          alert("Essa data não é valida");
          window.location.href = "/";
        }
      } else {
        alert("Campo nome não permite caracteres especiais");
        window.location.href = "/";
      }
    } else {
      alert("algum dos campos está vazio");
      window.location.href = "/";
    }
  }

  var maximoObs = 300;

  var quantidadeDados = dados.length;

  const [edit, setEdit] = useState<any>();
  const [filterBy, setFilterBy] = useState("");
  const [pag, setPag] = useState(1);

  function compared(a: any, b: any) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  }

  dados.sort(compared);

  function filterDados(orderValueInput, filter) {
    if (!filter) return orderValueInput;
    return dados.filter((student) =>
      student.nome.toLowerCase().includes(filter.toLowerCase())
    );
  }
  var indexIncio;
  var indexFinal;
  if (pag === 1) {
    indexIncio = 0;
    indexFinal = 9;
  }
  if (pag === 2) {
    indexIncio = 10;
    indexFinal = 19;
  }
  if (pag === 3) {
    indexIncio = 20;
    indexFinal = 29;
  }
  if (pag === 4) {
    indexIncio = 30;
    indexFinal = 39;
  }
  if (pag === 5) {
    indexIncio = 40;
    indexFinal = 49;
  }

  return (
    <div className="App">
      <div className="form">
        <h1>Formulário</h1>
        {!edit && (
          <form>
            <label>Nome:</label>
            <input
              name="inputNome"
              id="inputNome"
              type="text"
              // onKeyUp={(e: any) => tratarNome(e.target.value)}
            />
            <br></br>
            <label>Data de Nascimento:</label>
            <MaskedInput
              mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              onBlur={() => {}}
              onChange={() => {}}
              className="input"
              type="text"
              required
              name="inputData"
              id="inputData"
            />
            <br></br>
            <label>CPF:</label>
            <MaskedInput
              guide={false}
              onBlur={() => {}}
              onChange={() => {}}
              mask={[
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
              name="inputCpf"
              id="inputCpf"
              required
              type="text"
            />
            <br></br>
            <label>Celular:</label>
            <MaskedInput
              guide={false}
              onBlur={() => {}}
              onChange={() => {}}
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              name="inputCelular"
              id="inputCelular"
              required
              type="text"
            />
            <br></br>
            <label>E-mail:</label>
            <input
              name="inputEmail"
              id="inputEmail"
              required
              type="text"
            />{" "}
            <br></br>
            <label>Endereço:</label>
            <input
              name="inputEndereco"
              id="inputEndereco"
              required
              type="text"
            />{" "}
            <br></br>
            <label>Observação:</label>
            <textarea
              name="inputObservacoes"
              id="inputObservacoes"
              maxLength={maximoObs}
            ></textarea>
            <br></br>
            <button
              className="adicionar"
              type="button"
              onClick={() => Adicionar()}
            >
              Adicionar
            </button>
          </form>
        )}
        {edit && (
          <form>
            <label>Nome:</label>
            <input
              name="inputNome"
              id={edit.nome}
              type="text"
              defaultValue={edit.nome}
            />
            <br></br>
            <label>Data de Nascimento:</label>
            <input
              name="inputData"
              id={edit.data}
              type="text"
              defaultValue={edit.data}
            />{" "}
            <br></br>
            <label>CPF:</label>
            <MaskedInput
              guide={false}
              onBlur={() => {}}
              onChange={() => {}}
              mask={[
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
              name="inputCpf"
              id={edit.cpf}
              type="text"
              defaultValue={edit.cpf}
            />
            <br></br>
            <label>Celular:</label>
            <MaskedInput
              guide={false}
              onBlur={() => {}}
              onChange={() => {}}
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              name="inputCelular"
              id={edit.celular}
              type="text"
              defaultValue={edit.celular}
            />
            <br></br>
            <label>E-mail:</label>
            <input
              name="inputEmail"
              id={edit.email}
              type="text"
              defaultValue={edit.email}
            />{" "}
            <br></br>
            <label>Endereço:</label>
            <input
              name="inputEndereco"
              id={edit.endereco}
              type="text"
              defaultValue={edit.endereco}
            />{" "}
            <br></br>
            <label>Observação:</label>
            <textarea
              name="inputObservacoes"
              id="inputObservacoesEdit"
              defaultValue={edit.observacoes}
            ></textarea>{" "}
            <br></br>
            <button
              type="button"
              className="adicionar"
              onClick={() => Editar(edit)}
            >
              editar
            </button>
          </form>
        )}
      </div>
      <div className="list">
        <p className="space-between flex sem-margem">
          <label className="box-search">
            <input
              onChange={(e) => setFilterBy(e.currentTarget.value)}
              value={filterBy}
              className="input input-search"
              type="text"
              placeholder="Pesquisar por nome de usuário"
            />
          </label>
        </p>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>Cpf</th>
              <th>Celular</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Observação</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filterDados(dados, filterBy).map((dado: any, index) => {
              return (
                <>
                  {index >= indexIncio && index <= indexFinal && (
                    <tr key={dado.nome}>
                      <td>{dado.nome}</td>
                      <td>{dado.data}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.celular}</td>
                      <td>{dado.email}</td>
                      <td>{dado.endereco}</td>
                      <td>{dado.observacoes}</td>
                      <div className="buttons">
                        <button
                          type="button"
                          className="button-editar"
                          onClick={() => setEdit(dado)}
                        >
                          <img src="icons/edit.svg" alt="editar" />
                        </button>
                        <button
                          type="button"
                          className="button-remover"
                          onClick={() => Remover(dado)}
                        >
                          x
                        </button>
                      </div>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        <div className="pag">
          <span className={pag === 1 ? "ativo" : ""} onClick={() => setPag(1)}>
            1
          </span>
          {quantidadeDados >= 11 && (
            <span
              className={pag === 2 ? "ativo" : ""}
              onClick={() => setPag(2)}
            >
              2
            </span>
          )}
          {quantidadeDados >= 21 && (
            <span
              className={pag === 3 ? "ativo" : ""}
              onClick={() => setPag(3)}
            >
              3
            </span>
          )}
          {quantidadeDados >= 31 && (
            <span
              className={pag === 4 ? "ativo" : ""}
              onClick={() => setPag(4)}
            >
              4
            </span>
          )}
          {quantidadeDados >= 41 && (
            <span
              className={pag === 5 ? "ativo" : ""}
              onClick={() => setPag(5)}
            >
              5
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
