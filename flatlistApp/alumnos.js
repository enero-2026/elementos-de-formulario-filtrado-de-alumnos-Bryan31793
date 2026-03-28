import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Agregar from './Agregar';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [buscaAlumno, setBuscaAlumno] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Pantalla cargada");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAlumnos([
        { matricula: '2114354', nombre: 'CANDELARIA MORA SAMANTHA' },
        { matricula: '2111889', nombre: 'CANTU SILVA JAVIER' },
        { matricula: '2069119', nombre: 'CARMONA LOZANO ANGEL EMILIANO' },
        { matricula: '2132842', nombre: 'CASTILLO ACOSTA JORGE' },
        { matricula: '1994122', nombre: 'DAVILA GONZALEZ ALDO ADRIAN' },
        { matricula: '2018230', nombre: 'DURAN BARRIENTOS FABRIZIO' },
        { matricula: '21045641', nombre: 'FLORES GONZALEZ SEBASTIAN' },
        { matricula: '20182301', nombre: 'DURAN BARRIENTOS FABRIZIO' },
        { matricula: '2104564', nombre: 'FLORES GONZALEZ SEBASTIAN' },
        { matricula: '2066033', nombre: 'FLORES LÓPEZ DIEGO' },
        { matricula: '2132976', nombre: 'FLORES MARTINEZ ERICK ADRIAN' },
        { matricula: '2066114', nombre: 'GARZA AVALOS DIEGO' },
        { matricula: '2031243', nombre: 'GONZALEZ OVALLE CHRISTIAN GABRIEL' },
        { matricula: '20647331', nombre: 'GRANJA PEÑA DIEGO' },
        { matricula: '20312431', nombre: 'IBARRA RODRIGUEZ ALEXIS' },
        { matricula: '2064733', nombre: 'MARTINEZ ELIAS ANGEL SEBASTIAN' },
        { matricula: '2094647', nombre: 'MENDIETA GONZALEZ ESMERALDA GABRIELA' },
        { matricula: '2005102', nombre: 'MIRELES VELAZQUEZ ALEJANDRO' },
        { matricula: '2064574', nombre: 'MONSIVAIS SALAZAR ANDRES' },
        { matricula: '2024783', nombre: 'PARRAZALEZ VALDESPINO MARTHA JULIETA' },
        { matricula: '2066077', nombre: 'PEÑA MUNGARRO LUIS ANGEL' },
        { matricula: '2092151', nombre: 'PUENTE REYNOSO JULIO CESAR' },
        { matricula: '2103708', nombre: 'RAMIREZ LOPEZ BRYAN' },
        { matricula: '2115192', nombre: 'RAMOS AVILA LILIANA VALERIA' },
        { matricula: '2037503', nombre: 'RICO JAUREGUI MAURICIO' },
        { matricula: '2131513', nombre: 'RIVERA LUNA ADRIAN' },
        { matricula: '2013503', nombre: 'RIVERA REYNA JOSE EMILIO' },
        { matricula: '2004613', nombre: 'RODRIGUEZ OLVERA ROSA ISELA' },
        { matricula: '2133022', nombre: 'RODRIGUEZ RODRIGUEZ ANGEL AZAEL' },
        { matricula: '2026061', nombre: 'SANCHEZ GALARZA JUAN CARLOS' },
        { matricula: '2095320', nombre: 'SOLIS ORTIZ ALFREDO' },
        { matricula: '2025350', nombre: 'VELAZQUEZ ABREGO HERWIN DANIEL' },
        { matricula: '2103895', nombre: 'VILLAGRA RODRIGUEZ ANDRES NEHUEL' },
        { matricula: '1857791', nombre: 'ZACATENCO OLIVE RODRIGO' },
        { matricula: '2025218', nombre: 'ZAVALA CANTU TERESA MARGARITA' },
      ]);
      setCargando(false);
    }, 1500);
  }, []);

  const alumnosFiltrados = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(buscaAlumno.toLowerCase())
  );

  const handleAddAlumno = useCallback((nuevoAlumno) => {
    // Validar que la matrícula no sea duplicada desde el padre
    // Validación robusta: comparar matrículas trimmed
    const alumnoExistente = alumnos.find(
      alumno => alumno.matricula.trim() === nuevoAlumno.matricula.trim()
    );

    if (alumnoExistente) {
      // Si existe, no hacer nada (el modal mostrará el error)
      return false;
    }

    // Usar el operador spread (...) para copiar todos los alumnos
    // y agregar el nuevo al final del arreglo
    setAlumnos([...alumnos, nuevoAlumno]);
    // Cerrar el modal después de agregar
    setModalVisible(false);
    return true;
  }, [alumnos]);

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <Text style={styles.mensaje}>Cargando lista...</Text>
      </View>
    );
  }

  if (alumnos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.mensaje}>No hay alumnos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Alumnos</Text>
      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        + Agregar Alumno
      </Button>
      <Searchbar
        placeholder="Buscar alumno..."
        onChangeText={setBuscaAlumno}
        value={buscaAlumno}
        style={styles.searchbar}
      />
      <FlatList
        data={alumnosFiltrados}
        keyExtractor={(item) => item.matricula.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.matricula}>Matrícula: {item.matricula}</Text>
          </View>
        )}
      />
      <Agregar
        visible={modalVisible}
        onAdd={handleAddAlumno}
        onCancel={handleCancelModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  addButton: {
    marginBottom: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchbar: {
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
  },
  matricula: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  mensaje: {
    fontSize: 16,
    color: '#888',
  },
});
