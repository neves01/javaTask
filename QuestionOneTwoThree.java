public class QuestionOneTwoThree() {
  public static void main(String args[]) {
    // Question 1
    String[] list = {"ana", "aurelio", "bab", "hen", "henry", "lll", "abo"};
    var arrayStringList = Arrays.stream(list).filter(word -> word.length() == 3 && word.startsWith("a")).toList();
    arrayStringList.forEach(System.out::println);

    // Question 2
    String input = "ana wants some piece of cake";
    String output = Arrays.stream(input.split(" ")).reduce(String::concat).orElse("error");
    System.out.println(output);

    // Question 3
    int x = 10;
    int y = 20;
    x += y;
    y = x - y;
    x = x - y;
    System.out.println("x: " + x);
    System.out.println("y: " + y);
  }
}
