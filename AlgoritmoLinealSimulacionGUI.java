import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class AlgoritmoLinealSimulacionGUI extends JFrame {

    private JTextField campoX, campoK, campoG, campoIteraciones;

    public AlgoritmoLinealSimulacionGUI() {
        setTitle("Simulación de Algoritmo Lineal");
        setSize(700, 350); // Aumentar tamaño de la ventana
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Centrar la ventana

        // Crear componentes
        campoX = new JTextField(15);
        campoK = new JTextField(15);
        campoG = new JTextField(15);
        campoIteraciones = new JTextField(15);
        JButton botonCalcular = new JButton("Calcular");

        // Agregar ActionListener al botón
        botonCalcular.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                calcular();
            }
        });

        // Configurar el diseño
        JPanel panelEntradas = new JPanel();
        panelEntradas.setLayout(new GridLayout(5, 2));
        panelEntradas.add(new JLabel("Valor de 'x':"));
        panelEntradas.add(campoX);
        panelEntradas.add(new JLabel("Valor de 'k':"));
        panelEntradas.add(campoK);
        panelEntradas.add(new JLabel("Valor de 'g':"));
        panelEntradas.add(campoG);
        panelEntradas.add(new JLabel("Número de iteraciones:"));
        panelEntradas.add(campoIteraciones);
        panelEntradas.add(botonCalcular);

        add(panelEntradas, BorderLayout.NORTH);
        setVisible(true); // Hacer visible la ventana
    }

    private void calcular() {
        try {
            long x = Long.parseLong(campoX.getText());
            long k = Long.parseLong(campoK.getText());
            long g = Long.parseLong(campoG.getText());
            int iteraciones = Integer.parseInt(campoIteraciones.getText());

            // Calcular los valores de a y m
            long a = 1 + 4 * k; // Fórmula para a
            long m = (long) Math.pow(2, g); // m = 2^g
            long c = findLargestPrimeLessThan(m); // Encontrar el número primo más grande menor que m

            // Crear una nueva ventana para mostrar los resultados
            JFrame ventanaResultados = new JFrame("Resultados de la Simulación");
            ventanaResultados.setSize(700, 500); // Aumentar tamaño de la ventana de resultados
            ventanaResultados.setLocationRelativeTo(null); // Centrar la ventana

            // Crear un panel para mostrar los valores calculados como botones
            JPanel panelValores = new JPanel();
            panelValores.setLayout(new FlowLayout());
            panelValores.setBorder(BorderFactory.createTitledBorder("Valores Calculados"));

            JButton botonA = new JButton("a (multiplicador) = " + a);
            JButton botonC = new JButton("c (incremento) = " + c);
            JButton botonM = new JButton("m (módulo) = " + m);

            // Añadir los botones al panel
            panelValores.add(botonA);
            panelValores.add(botonC);
            panelValores.add(botonM);

            // Crear un panel para la tabla
            JPanel panelTabla = new JPanel();
            panelTabla.setLayout(new GridLayout(iteraciones + 1, 7)); // 7 columnas (a, x, c, Resultado, MOD, M-1, Ri)

            // Encabezado de la tabla
            panelTabla.add(new JButton("a"));
            panelTabla.add(new JButton("x"));
            panelTabla.add(new JButton("c"));
            panelTabla.add(new JButton("Resultado"));
            panelTabla.add(new JButton("MOD"));
            panelTabla.add(new JButton("M-1"));
            panelTabla.add(new JButton("Ri"));

            // Ejecutar el algoritmo lineal
            for (int i = 0; i < iteraciones; i++) {
                long resultado = (a * x + c); // Calcular el resultado sin aplicar el módulo
                long mod = resultado % m; // Aplicar el módulo
                double ri = (double) mod / (m - 1); // Calcular Ri como mod/(M-1)

                // Agregar los resultados en formato de tabla como botones
                panelTabla.add(new JButton(String.valueOf(a)));
                panelTabla.add(new JButton(String.valueOf(x)));
                panelTabla.add(new JButton(String.valueOf(c)));
                panelTabla.add(new JButton(String.valueOf(resultado)));
                panelTabla.add(new JButton(String.valueOf(mod)));
                panelTabla.add(new JButton(String.valueOf(m - 1)));
                panelTabla.add(new JButton(String.format("%.4f", ri)));

                // Actualizar x para la siguiente iteración
                x = mod;
            }

            // Panel para la tabla
            panelTabla.setBorder(BorderFactory.createEtchedBorder()); // Borde 3D

            // Agregar paneles al marco de resultados
            ventanaResultados.setLayout(new BorderLayout());
            ventanaResultados.add(panelValores, BorderLayout.NORTH);
            ventanaResultados.add(panelTabla, BorderLayout.CENTER);

            ventanaResultados.setVisible(true); // Hacer visible la ventana de resultados

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Por favor, introduce valores válidos.", "Error",
                    JOptionPane.ERROR_MESSAGE);
        }
    }

    // Función para verificar si un número es primo
    public static boolean isPrime(long num) {
        if (num <= 1)
            return false;
        if (num == 2)
            return true;
        if (num % 2 == 0)
            return false;
        for (long i = 3; i * i <= num; i += 2) {
            if (num % i == 0)
                return false;
        }
        return true;
    }

    // Función para encontrar el mayor número primo menor que m
    public static long findLargestPrimeLessThan(long m) {
        for (long i = m - 1; i > 1; i--) {
            if (isPrime(i)) {
                return i;
            }
        }
        return 2; // Si no se encuentra ningún primo menor, devolver 2 como último recurso
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(AlgoritmoLinealSimulacionGUI::new); // Crear la ventana en el hilo de despacho de
                                                                       // eventos
    }
}
