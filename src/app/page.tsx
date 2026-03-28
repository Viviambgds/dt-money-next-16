'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ConfirmationModal } from "@/components/ConfirmationModal";

const initialTransactions: ITransaction[] = [
  {
    id: "1",
    title: "Salário",
    price: 5000,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-01"),
  },
  {
    id: "2",
    title: "Aluguel",
    price: 1500,
    category: "Moradia",
    type: "OUTCOME",
    data: new Date("2024-06-05"),
  },
  {
    id: "3",
    title: "Supermercado",
    price: 300,
    category: "Alimentação",
    type: "OUTCOME",
    data: new Date("2024-06-10"),
  },
  {
    id: "4",
    title: "Freelance",
    price: 1200,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-15"),
  },
];

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(initialTransactions);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const handleAddTransaction = (transaction: ITransaction) => {
    setTransactionData((prevState) => [...prevState, transaction]);
  };

  const handleEditTransaction = (updatedTransaction: ITransaction) => {
    setTransactionData((prevState) =>
      prevState.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  const handleDeleteTransaction = () => {
    if (transactionToDelete) {
      setTransactionData((prevState) =>
        prevState.filter((transaction) => transaction.id !== transactionToDelete)
      );
      setTransactionToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleOpenEditModal = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setTransactionToEdit(null);
  };

  const calculaTotal = useMemo(() => {
    const totals = transactionData.reduce<TotalCard>(
      (acc, transaction) => {
        if (transaction.type === "INCOME") {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }
        return acc;
      },
      { total: 0, income: 0, outcome: 0 }
    );

    return totals;
  }, [transactionData]);

  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => setIsFormModalOpen(true)} />
      <BodyContainer>
        <CardContainer totalValues={calculaTotal} />
        <Table data={transactionData} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />
      </BodyContainer>

      {isFormModalOpen && (
        <FormModal
          closeModal={handleCloseFormModal}
          title={transactionToEdit ? "Editar Transação" : "Criar Transação"}
          addTransaction={handleAddTransaction}
          editTransaction={handleEditTransaction}
          transactionToEdit={transactionToEdit}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Excluir Transação"
        message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteTransaction}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setTransactionToDelete(null);
        }}
      />
    </div>
  );
}
