import java.text.Normalizer;
import java.util.Scanner;

public class Compilador {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); //cria o scanner

        System.out.print("Insira uma cadeia: "); 
        String input = scanner.nextLine(); //espera o input
        String[] tokens = input.split(""); //define o input, divide em tokens 1 por 1 em array

        if (tokens.length > 10) { //se 10 ou mais tokens, aviso
            System.out.println("CADEIA MAIOR DO QUE 10"); 
        }

        boolean ExpMat = false;
        boolean PrecisaOperador = false; //define os booleans

        for (int i = 0; i < Math.min(tokens.length, 10); i++) { // loop no maximo 10 vezes, minimo quantidade de tokens
            String token = tokens[i]; // define token como o token sendo processado atualmente no loop

            String TokenNormalizado = Normalizer.normalize(token, Normalizer.Form.NFD) // normaliza o token usando a norma nfd
                    .replaceAll("\\p{M}", ""); // remove  caracteres especiais

            if (TokenNormalizado.matches("[a-zA-Z0-9#!@\\[\\]{}()+\\-*/'^~]+")) { // se o token normalizado for um caractere permitido...
                if (TokenNormalizado.matches("[xyztw]+")) { // e se for xyztw...
                    if (!PrecisaOperador) { // e se precisar de operador...
                        System.out.println("xyztw não podem ser usados em strings"); // erro
                        return;
                    }
                    ExpMat = true; // se usar xyztw, o token é uma expressão matemática
                } else {
                    PrecisaOperador = !PrecisaOperador; // alterna o precisa operador
                }
            } else {
                System.out.println("Token inválido: " + input); // se não for algum caractere permitido retorna erro
                return;
            }
        }

        if (ExpMat) { // se for expressão
            System.out.println("Expressão matemática"); // retorna que é
        } else if (input.matches("[0-9].*")) { // se numero, retorna erro
            System.out.println("Palavra reservada");
        } else {
            System.out.println("Não é expressão"); // se não tiver xyztw, vai  definir como não sendo expressão
        }
    }
}