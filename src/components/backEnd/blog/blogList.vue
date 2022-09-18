<template>
    <tr>
        <th scope="row">1</th>
        <td>{{ title }}</td>
        <td>{{ category }}</td>
        <td>{{ created_at }}</td>
        <td>
            <button class="btn btn-info btn-sm" type="button"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>&nbsp;
            <button class="btn btn-danger btn-sm" type="button"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: ['id', 'title', 'category', 'created_at'],
    }
</script>