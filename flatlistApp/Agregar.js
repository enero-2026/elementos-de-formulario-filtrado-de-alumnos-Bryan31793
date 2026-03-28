import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, TextInput, Button, Snackbar } from 'react-native-paper';

export default function Agregar({ visible, onAdd, onCancel }) {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [mostrarError, setMostrarError] = useState(false);

  const handleAdd = () => {
    // Validar que ambos campos tengan contenido
    if (!matricula.trim()) {
      setError('La matrícula no puede estar vacía');
      setMostrarError(true);
      return;
    }

    if (!nombre.trim()) {
      setError('El nombre no puede estar vacío');
      setMostrarError(true);
      return;
    }

    // Llamar onAdd y ver si fue exitoso
    const nuevoAlumno = {
      matricula: matricula.trim(),
      nombre: nombre.trim(),
    };

    const agregadoExitosamente = onAdd(nuevoAlumno);

    // Si fue exitoso, limpiar los campos
    if (agregadoExitosamente) {
      setMatricula('');
      setNombre('');
      setError('');
    } else {
      // Si no fue exitoso, mostrar error de duplicado
      setError('La matrícula ya existe. Por favor ingresa una matrícula diferente.');
      setMostrarError(true);
    }
  };

  const handleCancel = () => {
    // Limpiar los campos de texto
    setMatricula('');
    setNombre('');
    setError('');
    // Cerrar el modal
    onCancel();
  };

  return (
    <>
      <Modal visible={visible} onDismiss={handleCancel} contentContainerStyle={styles.modal}>
        <View style={styles.container}>
          <TextInput
            label="Matrícula"
            placeholder="Ingresa la matrícula del alumno"
            value={matricula}
            onChangeText={setMatricula}
            style={styles.input}
          />
          <TextInput
            label="Nombre"
            placeholder="Ingresa el nombre del alumno"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleAdd} style={styles.button}>
              Agregar
            </Button>
            <Button mode="outlined" onPress={handleCancel} style={styles.button}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
      <Snackbar
        visible={mostrarError}
        onDismiss={() => setMostrarError(false)}
        duration={3000}
      >
        {error}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    elevation: 5,
  },
  input: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
