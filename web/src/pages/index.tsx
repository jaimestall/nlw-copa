import { api } from "@/lib/axios";
import Image from "next/image";
import { FormEvent, useState } from "react";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import iconCheckImg from "../assets/icon-check.svg";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImage from "../assets/users-avatar-example.png";

// interfaces são criadas para definir de uma vez por todas os tipos de uma variável
interface HomeProps {
  pollsAmount: number;
  guessesAmount: number;
  usersAmount: number;
}

export default function Home(props: HomeProps) {
  // useState é o hook do react utilizado para atribuir valores a variáveis dinamicamente ao longo da aplicação
  const [pollTitle, setPollTitle] = useState("");

  // função de criação de bolão. O parâmetro event é o evento chamado ao clicar no elemento que executa esta função. Este elemento é o botão de criar bolão. Este evento possui a tipagem FormEvent, previamente criada pelo react, e nele existe a função preventDefault(), que previne o comportamento padrão de formulários, que é tentar enviar o usuário do navegador para outra página.
  async function createPoll(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/polls", {
        title: pollTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      alert(
        "Bolão criado com sucesso. O código foi copiado para a área de transferência!"
      );

      setPollTitle("");
    } catch (err) {
      console.log(err);
      alert("Falha ao criar bolão, tente novamente!");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="Logo do projeto" quality={100} />

        <h1 className="mt-16 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe com seus amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvatarExampleImage}
            alt="Imagem de avatares de pessoas que estão participando do"
            quality={100}
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.usersAmount}</span>{" "}
            pessoas já estão usando!
          </strong>
        </div>

        <form onSubmit={createPoll} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual nome do seu bolão?"
            required
            onChange={(event) => setPollTitle(event.target.value)}
            value={pollTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm hover:bg-yellow-700"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas!
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100">
          <div className="flex items-center gap-6">
            <Image
              src={iconCheckImg}
              alt="Ícone de verificação"
              quality={100}
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.pollsAmount}</span>
              <span>bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image
              src={iconCheckImg}
              alt="Ícone de verificação"
              quality={100}
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.guessesAmount}</span>
              <span>palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Imagem de dois celulares contendo uma prévia do aplicativo mobile."
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [pollAmountResponse, guessAmountResponse, userAmountResponse] =
    await Promise.all([
      api.get("polls/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      pollsAmount: pollAmountResponse.data.pollsAmount,
      guessesAmount: guessAmountResponse.data.guessesAmount,
      usersAmount: userAmountResponse.data.usersAmount,
    },
  };
};
